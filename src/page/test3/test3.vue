<template>
  <div>
    <xheaderBar
      :options="options"
      :headerFn="headerFn"
    >
      <template slot="seniorSearch">
        <el-col :span="6">
          <el-form-item label="仓储公司">
              <el-select
                v-model="state4"
                filterable
                remote
                :clearable="true"
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
                :clearable="true"
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
      </template>
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
      :editFn="editFn"
      :options="options"
    ></xedit>
  </div>
</template>
<script lang="ts">
  /**
   *  如果模糊搜索两个相关联。新增和修改页面必须从写
   */
  import clone from 'clone'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  //  let baseUrl = Vue.prototype.$baseUrl.rbs
  @Component({
    watch: {
      'getState.searchBtn': {
        handler: function (val, oldVal) {
          if (oldVal !== val && oldVal !== undefined) {
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
      delUrl: Vue.prototype.$baseUrl.rbs + '/StdWarehouseReceiptDetails',
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
          width: 180,
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
          rules: [{required: true, message: '必填'}]
        },
        {
          key: 'StdWRStatus',
          dicKey: 'StdWRStatusDict',
          title: '仓单流转状态',
          width: 130,
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
          filter: true,
          filters: [],
          rules: [{required: true, message: '必填'}]
        },
        {
          key: 'RBSWRNo',
          title: '系统仓单号',
          width: 180,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 200}]
        },
        {
          key: 'BatchNo',
          title: '批号',
          width: 120,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'Brand',
          title: '商标',
          width: 120,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'ProductionPlace',
          title: '产地',
          width: 120,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'Rank',
          title: '品级',
          width: 160,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'Manufacturer',
          title: '生产商',
          width: 120,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150, trigger: 'blur'}]
        },
        {
          key: 'GoodsAllocation',
          title: '货位',
          width: 120,
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'Weight',
          title: '重量（吨）',
          width: 120,
          type: 'number',
          rules: [{required: true, message: '必填'}, {validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'QCDate',
          title: '质检日期',
          width: 120,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'QCExcpireDate',
          title: '质检到期日',
          width: 120,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'WRExpireDate',
          title: '仓单到期日',
          width: 120,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'RentStartDate',
          title: '仓租起始日',
          width: 120,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'RentEndDate',
          title: '仓租付止日',
          width: 120,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'RentSettlementDate',
          title: '仓租结算日',
          width: 120,
          type: 'date',
          sortable: 'custom',
          rules: []
        },
        {
          key: 'Amount',
          title: '数量（张）',
          width: 120,
          type: 'number',
          rules: [{required: true, message: '必填'}, {validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'ContractNo',
          title: '合同编号',
          width: 120,
          rules: []
        },
        {
          key: 'WRSource',
          title: '仓单来源',
          width: 120,
          type: 'select',
          filters: [],
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'FromClient',
          title: '来源客户',
          width: 120,
          type: '',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 150}]
        },
        {
          key: 'PremiumDiscount',
          title: '升贴水（元/吨）',
          width: 200,
          type: 'number',
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 100}]
        },
        {
          key: 'WRHoldStatus',
          title: '仓单持有状态',
          width: 130,
          type: 'select',
          filters: [],
          rules: [{validator: Vue.prototype.$validate.maxLeng, max: 100}]
        },
        {
          key: 'action',
          title: '操作',
          width: 160,
          addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
          editLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {

      })
    }

    headerFn() {
      return {
      }
    }
    tableFn() {
      return {}
    }

    addFn() {
      return {
      }
    }
    editFn() {
      return {
      }
    }
    get getState() {
      return this.$store.state[this.options.gridKey]
    }
  }
</script>
