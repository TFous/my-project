<template>
  <div>
    <xheaderBar
      :options="options"
    >
      <span slot="seniorSearch">
        <el-col :span="6">
          <el-form-item label="仓储公司">
              <el-select
                v-model="state4"
                filterable
                remote
                @change="remoteMethodChange"
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
            <el-option
              v-for="item in remoteList2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际存放库">
              <el-select
                v-model="state1"
                filterable
                remote
                @change="remoteMethodChange1"
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod1"
                :loading="loading">
            <el-option
              v-for="item in remoteList1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </span>
    </xheaderBar>
    <xtable
      :tableFn="tableFn"
      :options="options"
    ></xtable>
    <xpagers
      :options="options"
    ></xpagers>
    <xadd
      :addFn="addFn"
      :options="options"
    ></xadd>
    <xedit
      :options="options"
    ></xedit>
  </div>
</template>
<script lang="ts">
  import clone from 'clone'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {debounce} from '../../api/common/debounce.js'
  //  let baseUrl = Vue.prototype.$baseUrl.rbs
  @Component({
    watch: {
      'getState.searchBtn': {
        handler: function (val, oldVal) {
          if (oldVal !== val && oldVal !== undefined) {
            console.log(this.state4)
          }
        },
        deep: true
      },
      'getState.initTableData': {
        handler: function (val, oldVal) {
          if (oldVal !== undefined) {
            this.setFilters()
            this.setTableData(val)
          }
        },
        deep: true
      }
    }
  })
  export default class test3 extends Vue {
    remoteList1: Array<object> = []
    state1: number = null
    remoteList2: Array<object> = []
    state4: number = null
    loading: boolean = false
    options: any = (<any>Object).assign({}, Vue.prototype.$xvuex.options, {
      url: Vue.prototype.$baseUrl.rbs + '/StdWarehouseReceiptDetails',
      addUrl: Vue.prototype.$baseUrl.rbs + '/StdWarehouseReceipt',
      editUrl: Vue.prototype.$baseUrl.rbs + '/StdWarehouseReceiptDetails',
      urlParameter: {
        $filter: '',
        $orderby: '',
        $expand: 'WarehouseDetails($select=WarehouseName),WarehousingCompanyDetails($select=WarehousingCompany)'
      },
      dicUrls: {
        VarietyDict: Vue.prototype.$baseUrl.rbs + '/VarietyDict',
        StdWRStatusDict: Vue.prototype.$baseUrl.rbs + '/StdWRStatusDict'
      },
      title: '非标准仓单管理',  // 本页面名称
      gridKey: 'NonStdWarehouseReceipt',  // 本页面 Eng名，唯一
      isSelection: true, // 是否开启多选checkBox
      table: [
        {
          key: 'Id',
          title: 'ID',
          addLayer: 'show',
          editLayer: 'show', // 编辑页面 是否显示：不显示写，显示可不写或其他值
          searchKey: 'show', // 搜索下拉 是否显示：不显示写，显示可不写或其他值
          column: 'show',
          width: 'auto',
          type: 'number'
        },
        {
          key: 'BusinessBatchNo',
          title: '业务流水号',
          add_hide: '1',  // 新增页面 是否显示：不显示写，显示可不写或其他值
//          add_hide: 'relyOn',  // 新增页面 是否显示：不显示写，显示可不写或其他值
          edit_hide: 1, // 编辑页面 是否显示：不显示写，显示可不写或其他值
          search_hide: 1, // 搜索下拉 是否显示：不显示写，显示可不写或其他值
          table_hide: 12,
          value: '123',  // 当 add_hide 值为relyOn 时，add时这个为依赖，且有value属性
          width: 180,
          disabled: true,
          type: '',
          fixed: 'left',
          render: [
            {
              tag: 'a',
              href: 'http://www.baidu.com',
              text: '删除'
            }
          ]
        },
        {
          key: 'WarehousingCompany',
          title: '仓储公司',
          width: 120,
          type: 'remoteMethod',
          remoteMethodChange: this.remoteMethodChange,
          remoteMethod: this.remoteMethod,
          remoteList: 'remoteList2',
          search_hide: 1,
          filters: [],
          rules: [{required: true, message: '必填'}]
        },
        {
          key: 'Warehouse',
          title: '实际存放库',
          width: 120,
          remoteMethodChange: this.remoteMethodChange1,
          remoteMethod: this.remoteMethod1,
          remoteList: 'remoteList1',
          type: 'remoteMethod',
          filters: [],
          search_hide: 1,
          rules: [{required: true, message: '必填'}]
        },
        {
          key: 'StdWRStatus',
          dicKey: 'StdWRStatusDict',
          title: '仓单流转状态',
          width: 130,
          search_hide: 11,
          type: 'select',
          filter: true,
          filters: [],
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'Variety',
          title: '品种',
          dicKey: 'VarietyDict', // 如果有数据字典，必须要有dicKey，指向数据字典路劲
          width: 120,
          type: 'select',
          search_hide: 1,
          filter: true,
          filters: [],
          rules: [{required: true, message: '必填'}]
        },
        {
          key: 'RBSWRNo',
          title: '系统仓单号',
          disabled: true,
          add_hide: 1,  // 新增页面 是否显示：不显示写，显示可不写或其他值
          edit_hide: 12, // 编辑页面 是否显示：不显示写，显示可不写或其他值
          search_hide: 12, // 搜索下拉 是否显示：不显示写，显示可不写或其他值
          table_hide: 12,
          width: 180,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 200}]
        },
        {
          key: 'DutyPaidStatus',
          title: '完税状态',
          width: 200,
          add_hide: 123,  // 新增页面 是否显示：不显示写，显示可不写或其他值  relyOn
          search_hide: 1, // 搜索下拉 是否显示：不显示写，显示可不写或其他值
          type: 'select',
          filters: [],
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 200}]
        },
        {
          key: 'RBSContractNo',
          title: '系统合同号',
          add_hide: 12,  // 新增页面 是否显示：不显示写，显示可不写或其他值
          edit_hide: 12, // 编辑页面 是否显示：不显示写，显示可不写或其他值
          search_hide: 12, // 搜索下拉 是否显示：不显示写，显示可不写或其他值
          table_hide: 12,
          value: null,  // 当 add_hide 值为relyOn 时，add时这个为依赖，且有value属性
          width: 180,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 200}]
        },
        {
          key: 'WRNo',
          title: '原始仓单号',
          width: 200,
          add_hide: 12,  // 新增页面 是否显示：不显示写，显示可不写或其他值
          edit_hide: 12, // 编辑页面 是否显示：不显示写，显示可不写或其他值
          search_hide: 12,
          type: '', // remote
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 200}]
        },
        {
          key: 'BatchNo',
          title: '批号',
          width: 120,
          type: '',
          search_hide: 12,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'Brand',
          title: '商标',
          width: 120,
          search_hide: 12,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'ProductionPlace',
          title: '产地',
          width: 120,
          search_hide: 12,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'Rank',
          title: '品级',
          width: 160,
          search_hide: 12,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'Manufacturer',
          title: '生产商',
          width: 120,
          search_hide: 12,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'GoodsAllocation',
          title: '货位',
          width: 120,
          search_hide: 12,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'Weight',
          title: '重量（吨）',
          width: 120,
          disabled: true,
          search_hide: 12,
          type: '',
          rules: [{required: true, message: '必填'}, {validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'QCDate',
          title: '质检日期',
          width: 120,
          search_hide: 11,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'QCExcpireDate',
          title: '质检到期日',
          width: 120,
          type: 'date',
          search_hide: 11,
          sortable: 'custom',
          rules: []
        },
        {
          key: 'WRExpireDate',
          title: '仓单到期日',
          width: 120,
          search_hide: 11,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'RentStartDate',
          title: '仓租起始日',
          width: 120,
          search_hide: 11,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'RentEndDate',
          title: '仓租付止日',
          width: 120,
          search_hide: 11,
          type: 'date',
          sortable: 'custom',
          value: null,
          rules: []
        },
        {
          key: 'RentSettlementDate',
          title: '仓租结算日',
          width: 120,
          search_hide: 11,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'Amount',
          title: '数量（张）',
          width: 120,
          search_hide: 12,
          type: '',
          disabled: true,
          rules: [{required: true, message: '必填'}, {validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'ContractNo',
          title: '合同编号',
          width: 120,
          search_hide: 12,
          type: '',
          rules: []
        },
        {
          key: 'WRSource',
          title: '仓单来源',
          width: 120,
          type: 'select',
          search_hide: 1,
          filters: [],
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'FromClient',
          title: '来源客户',
          width: 120,
          search_hide: 12,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'PremiumDiscount',
          title: '升贴水（元/吨）',
          width: 200,
          search_hide: 12,
          type: 'number',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 100}]
        },
        {
          key: 'WRHoldStatus',
          title: '仓单持有状态',
          width: 130,
          type: 'select',
          search_hide: 1,
          filters: [],
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 100}]
        },
        {
          key: 'action',
          title: '操作',
          width: 160,
          addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
          edit_hide: 1, // 编辑页面 是否显示：不显示写，显示可不写或其他值
          search_hide: 1, // 搜索下拉 是否显示：不显示写，显示可不写或其他值
          type: '',
          fixed: 'right',
          render: [
            {
              fn: this.editRow,
              type: 'primary',
              tag: 'button',
              text: '编辑'
            },
            {
              fn: this.deleteRow,
              tag: 'button',
              type: 'danger',
              text: '删除'
            }
          ]
        }
      ]
    })

    getList(query: string) {
      let url = Vue.prototype.$baseUrl.rbs + `/WarehousingCompanyDetails?$filter=contains(WarehousingCompany,'${query}')`
      let requestDataHeader = Vue.prototype.$api.request(url)
      fetch(requestDataHeader).then(resp => {
        return resp.json()
      }).then(data => {
        let result: Array<object> = []
        data.value.forEach(function (item) {
          let obj: any = {}
          obj.label = item.WarehousingCompany
          obj.value = item.Id
          result.push(obj)
        })
        this.loading = false
        this.remoteList2 = result
      })
    }

    remoteMethodChange(val) {
      let otherSeniorSearchOpt = clone(this.getState.otherSeniorSearchOpt)
      let newopt = (<any>Object).assign(otherSeniorSearchOpt, {
        WarehousingCompany: val
      })
      this.$store.dispatch(this.options.gridKey + 'setData', {otherSeniorSearchOpt: newopt})
    }

    remoteMethod(query: string) {
      if (query !== '') {
        this.loading = true
        debounce(this.getList(query), 1200)
      } else {
        this.remoteList2 = []
      }
    }

    remoteMethod1(query: string) {
      if (this.state4 === null) {
        alert('仓储公司不能为空')
        return false
      }
      if (query !== '') {
        this.loading = true
        let WarehousingCompanyId = this.state4
        let url = Vue.prototype.$baseUrl.rbs + `/WarehouseDetails?$filter=WarehousingCompany eq ${WarehousingCompanyId}`
        let requestDataHeader = Vue.prototype.$api.request(url)
        fetch(requestDataHeader).then(resp => {
          return resp.json()
        }).then(data => {
          let result: Array<object> = []
          data.value.forEach(function (item) {
            let obj: any = {}
            obj.label = `${item.WarehouseName} == ${item.Id}`
            obj.value = item.Id
            result.push(obj)
          })
          this.loading = false
          this.remoteList1 = result
        })
      } else {
        this.remoteList1 = []
      }
    }

    remoteMethodChange1(val) {
      let otherSeniorSearchOpt = clone(this.getState.otherSeniorSearchOpt)
      let newopt = (<any>Object).assign(otherSeniorSearchOpt, {
        Warehouse: val
      })
      this.$store.dispatch(this.options.gridKey + 'setData', {otherSeniorSearchOpt: newopt})
    }

    handleSelect(item) {
      console.log(item)
    }

    /**
     *  设置筛选项内容
     */
    setFilters() {
      let _this = this
      let table = clone(this.getState.table)
      table.forEach(function (item) {
        if (item.filter === true) {
          let filters = []
          let selects = []
          let dicData = _this.$store.state[item.dicKey].data.value
          dicData.forEach(function (dicItem) {
//            帅选
            let filterItem: any = {}
            filterItem.text = dicItem.Value
            filterItem.value = `(${item.key} eq '${dicItem.Code}')`
            filters.push(filterItem)
//            修改新增
            let selectItem: any = {}
            selectItem.text = dicItem.Value
            selectItem.value = dicItem.Code
            selects.push(selectItem)
          })
          item['filters'] = filters
          item['selects'] = selects
        }
      })
      _this.$store.dispatch(_this.options.gridKey + 'setData', {table: table})
    }

    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    setTableData(tableData) {
      let initData = clone(tableData)
      let VarietyDict = this.$store.state.VarietyDict.data.value
      let StdWRStatusDict = this.$store.state.StdWRStatusDict.data.value
      initData.forEach(function (item) {
        VarietyDict.forEach(function (dicItem) {
          if (dicItem.Code === item.Variety) {
            item.Variety = dicItem.Value
          }
        })
        StdWRStatusDict.forEach(function (dicItem) {
          if (dicItem.Code === item.StdWRStatus) {
            item.StdWRStatus = dicItem.Value
          }
        })
        item.RentSettlementDate = item.RentSettlementDate !== null ? item.RentSettlementDate.split('T')[0] : null
        item.WarehousingCompany = item.WarehousingCompanyDetails.WarehousingCompany
        item.Warehouse = item.WarehouseDetails.WarehouseName
      })
      this.$store.dispatch(this.options.gridKey + 'setData', {tableData: initData})
    }

    editRow(scope) { // 设置修改弹窗数据
      let _this = this
      let data = scope.row
      if (data) {
        this.getState.initTableData.forEach(function (item) {
          if(item.Id === data.Id){
            _this.$store.dispatch(_this.options.gridKey + '_edit_Window_Visible', item)
          }
        })
//        try {
//          for (let item of this.getState.table) {
//            if (item.type === 'select') {
//              this.getState[item.key].filter(function (e) {
//                if (e.label === data[item.key]) {
//                  data[item.key] = e.values
//                }
//              })
//            }
//          }
//        } catch (e) {
//        }
      }
    }

    deleteRow(scope) {
      this.$confirm('此操作将删除该项, 是否继续?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = scope.row.Id
        let url = `${Vue.prototype.$baseUrl.rbs}/StdWarehouseReceiptDetails(${id})`
        let requestDataHeader = Vue.prototype.$api.request(url, {
          method: 'DELETE'
        })
        fetch(requestDataHeader).then(resp => {
          return resp.json()
        }).then(data => {
          console.log(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {

      })

//      _this.$Modal.confirm({
//        title: '删除确认',
//        content: '此操作将删除该项, 是否继续?',
//        onOk: function () {
//          o(_self.options.api).find(row['Id']).remove().save().then(function (data) {
//            let msg = row.Name ? row.Name + '删除成功' : '删除成功'
//            _self.$Message.info(msg)
//            _self.$store.dispatch(_self.options.gridKey + '_set_refresh')
//            //            删除最后一页 bug
//            let states = _self.$store.state[_self.options.gridKey]
//            let pager_CurrentPage = states.pager_CurrentPage
//            let pager_Total = states.pager_Total
//            let pageSize = states.pager_Size
//            if (pager_CurrentPage > 1 && pager_Total % pageSize === 1) {
//              _self.$store.dispatch(_self.options.gridKey + '_set_state_data', {pager_CurrentPage: pager_CurrentPage - 1})
//            }
//          })
//        }
//      })
    }

    tableFn() {
      return {}
    }

    addFn() {
      return {
//        handleSubmit(formName) {
//          let _self = this
//          let newData = Object.assign({}, _self.dataMsg)
//          console.log(newData)
//          this.$refs[formName].validate((valid) => {
//            if (valid) {
//
//            } else {
//              console.log('error submit!!')
//              return false;
//            }
//          })
//        }
      }
    }

    get getState() {
      return this.$store.state[this.options.gridKey]
    }
  }
</script>
