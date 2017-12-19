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
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
            <el-option
              v-for="item in list4"
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
    <!--<xadd-->
    <!--:options="options"-->
    <!--&gt;</xadd>-->
    <!--<xedit-->
    <!--:options="options"-->
    <!--&gt;</xedit>-->
  </div>
</template>
<script>
  import clone from 'clone'

  export default {
    data () {
      let baseUrl = this.$baseUrl.rbs
      let _this = this
      return {
        list4: [],
        state4: '',
        loading: false,
        inputCopy: null,
        input: null,
        options: Object.assign({}, this.$xvuex.options, {   // options将存入vuex,基础配置看 cVuex.options
          urlParameter: {
            $filter: '',
            $orderby: '',
            $expand: 'WarehouseDetails($select=WarehouseName),WarehousingCompanyDetails($select=WarehousingCompany)'
          },
          url: baseUrl + '/StdWarehouseReceiptDetails', // 计算存入的，初始值和api相同
          dicUrls: {
            VarietyDict: baseUrl + '/VarietyDict',
            StdWRStatusDict: baseUrl + '/StdWRStatusDict'
          },
          title: '非标准仓单管理',  // 本页面名称
          gridKey: 'NonStdWarehouse333Receipt',  // 本页面 Eng名，唯一
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
              add_hide: 'relyOn',  // 新增页面 是否显示：不显示写，显示可不写或其他值
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
              key: 'RBSWRNo',
              title: '系统仓单号',
              disabled: true,
              add_hide: 1,  // 新增页面 是否显示：不显示写，显示可不写或其他值
              edit_hide: 12, // 编辑页面 是否显示：不显示写，显示可不写或其他值
              search_hide: 12, // 搜索下拉 是否显示：不显示写，显示可不写或其他值
              table_hide: 12,
              value: '123',  // 当 add_hide 值为relyOn 时，add时这个为依赖，且有value属性
              width: 180,
              type: ''
            },
            {
              key: 'Variety',
              dicKey: 'VarietyDict',
              title: '品种',
              width: 120,
              addLayer: 'show',
              editLayer: 'show', // 编辑页面 是否显示：不显示写，显示可不写或其他值
              searchKey: 'show', // 搜索下拉 是否显示：不显示写，显示可不写或其他值
              column: 'show',
              type: 'select',
              filter: true,
              filters: [],
              rules: [{required: true, message: '必填'}]
            },
            {
              key: 'StdWRStatus',
              dicKey: 'StdWRStatusDict',
              title: '仓单状态',
              width: 120,
              search_hide: 12,
              type: 'select',
              filter: true,
              filters: [],
              filterRemote (value) {
                this.$f.tableFilter(_this, 'StdWRStatus', value)
              },
              rules: []
            },
            {
              key: 'RentSettlementDate',
              title: '仓租结算日',
              width: 220,
              search_hide: 12,
              type: 'date',
              sortable: 'custom',
              rules: []
            },
            {
              key: 'WarehousingCompany',
              title: '仓储公司',
              width: 120,
              type: 'select',
              filters: [],
              filterRemote (value) {
                this.$f.tableFilter(_this, 'WarehousingCompany', value)
              },
              search_hide: 1,
              rules: [{required: true, message: '必填'}]
            },
            {
              key: 'Warehouse',
              title: '实际存放库',
              width: 150,
              type: 'select',
              column: 'show',
              filters: [],
              filterRemote (value) {
                this.$f.tableFilter(_this, 'Warehouse', value)
              },
              search_hide: 1,
              rules: [{required: true, message: '必填'}]
            },
            {
              key: 'BatchNo',
              title: '批号',
              width: 120,
              type: '',
              search_hide: 12,
              rules: []
            },
            {
              key: 'Rank',
              title: '品级',
              width: 160,
              search_hide: 12,
              type: '',
              rules: [{validator: this.$validate.maxLeng, max: 150, trigger: 'blur'}]
            },
            {
              key: 'Weight',
              title: '数量（吨）',
              width: 180,
              search_hide: 12,
              type: 'number',
              disabled: true,
              rules: [{required: true, message: '必填'}, {validator: this.$validate.maxLeng, max: 150}]
            },
            {
              key: 'WRExpireDate',
              title: '仓单到期日',
              width: 130,
              add_hide: 'relyOn',
              table_hide: 1,
              edit_hide: 1,
              value: null,
              search_hide: 1,
              type: 'date',
              rules: []
            },
            {
              key: 'GetCargoPropertyDate',
              title: '收到货权日期',
              width: 130,
              search_hide: 12,
              type: 'date',
              sortable: 'custom',
              rules: []
            },
            {
              key: 'RentStartDate',
              title: '仓租起始日',
              width: 120,
              search_hide: 12,
              type: 'date',
              sortable: 'custom',
              rules: []
            },
            {
              key: 'RentEndDate',
              title: '仓租付止日',
              width: 120,
              search_hide: 12,
              type: 'date',
              sortable: 'custom',
              value: null,
              rules: []
            },
            {
              key: 'CargoStatus',
              title: '货物状态',
              width: 120,
              search_hide: 12,
              type: 'select',
              filters: [],
              filterRemote (value) {
                this.$f.tableFilter(_this, 'CargoStatus', value)
              },
              rules: []
            },
            {
              key: 'RBSContractNo',
              title: '系统合同号',
              disabled: true,
              width: 210,
              search_hide: 11,
              type: '',
              rules: []
            },
            {
              key: 'ContractNo',
              title: '合同号',
              width: 210,
              search_hide: 1,
              table_hide: 1,
              type: '',
              rules: []
            },
            {
              key: 'WRSource',
              title: '仓单来源',
              width: 120,
              search_hide: 12,
              type: 'select',
              filters: [],
              filterRemote (value) {
                this.$f.tableFilter(_this, 'WRSource', value)
              },
              rules: []
            },
            {
              key: 'FromClient',
              title: '来源客户',
              width: 120,
              search_hide: 122,
              type: '',
              rules: []
            },
            {
              key: 'WRHoldStatus',
              title: '仓单持有状态',
              width: 140,
              search_hide: 1,
              type: 'select',
              filters: [],
              filterRemote (value) {
                this.$f.tableFilter(_this, 'WRHoldStatus', value)
              },
              rules: []
            },
//            {
//              key: 'OperCode',
//              title: '操作员',
//              width: 120,
//              column: 'hiden',
//              edit_hide: 1,
//              search_hide: 1,
//              table_hide: 1,
//              type: '',
//              rules: []
//            },
//            {
//              key: 'IsDelete',
//              title: '是否删除',
//              width: 120,
//              addLayer: 'hide',
//              add_hide: 'relyOn',
//              edit_hide: 1,
//              search_hide: 1,
//              table_hide: 1,
//              value: false,
//              type: '',
//              rules: []
//            },
            {
              key: 'action',
              title: '操作',
              width: 160,
              add_hide: 1,  // 新增页面 是否显示：不显示写，显示可不写或其他值
              edit_hide: 1, // 编辑页面 是否显示：不显示写，显示可不写或其他值
              search_hide: 1, // 搜索下拉 是否显示：不显示写，显示可不写或其他值
              type: '',
              fixed: 'right',
              render: [
                {
                  fn: _this.deleteRow,
                  tag: 'button',
                  type: 'auto',
                  text: '删除'
                },
                {
                  fn: _this.editRow,
                  type: 'danger',
                  tag: 'button',
                  text: '编辑'
                }
              ]
            }
          ]
        })
      }
    },
    watch: {
      'getState.initTableData': {
        handler: function (val, oldVal) {
          if (oldVal !== undefined) {
            this.setFilters()
            this.setTableData(val)
          }
        },
        deep: true
      }
    },
    created () {
    },
    beforeMount () {

    },
    mounted: function () {
      console.log(this.debounce)
    },
    methods: {
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true
          let url = this.$baseUrl.rbs + `/WarehousingCompanyDetails?$filter=contains(WarehousingCompany,'${query}')`
          // WarehousingCompanyDetails
          let _this = this
          let requestDataHeader = this.$api.request(url)
          fetch(requestDataHeader).then(resp => {
            return resp.json()
          }).then(data => {
            let result = []
            data.value.forEach(function (item) {
              let obj = {}
              obj.label = item.WarehousingCompany
              obj.value = item.Code
              result.push(obj)
            })
            this.loading = false
            _this.list4 = result
            console.log(_this.list4)
//          return result
          })
        } else {
          this.list4 = []
        }
      },
      handleSelect (item) {
        console.log(item)
      },
      setFilters () {
        let _this = this
        let table = clone(this.getState.table)
        table.forEach(function (item) {
          if (item.filter === true) {
            let filters = []
            let dicData = _this.$store.state[item.dicKey].data.value
            dicData.forEach(function (dicItem) {
              let filterItem = {}
              filterItem.text = dicItem.Value
              filterItem.value = `(${item.key} eq '${dicItem.Code}')`
              filters.push(filterItem)
            })
            item['filters'] = filters
//            let filterObj = {}
//            filterObj[item.key] = filters
//            _this.$store.dispatch(_this.options.gridKey + 'setData', filterObj)
          }
        })
        _this.$store.dispatch(_this.options.gridKey + 'setData', {table: table})
      },
      setTableData (val) {
        let initData = clone(val)
//        console.log(val)
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
      },
      editRow (scope) { // 设置修改弹窗数据
        let data = scope.row
        if (data) {
          try {
            for (let item of this.getState.table) {
              if (item.type === 'select') {
                this.getState[item.key].filter(function (e) {
                  if (e.label === data[item.key]) {
                    data[item.key] = e.values
                  }
                })
              }
            }
          } catch (e) { }
          this.$store.dispatch(this.options.gridKey + '_edit_Window_Visible', data)
        }
      },
      deleteRow (scope) {
      },
      tableFn () {
        return {}
      }
    },
    computed: {
      getState () {
        return this.$store.state[this.options.gridKey]
      },
      getdicBook () {
        return this.$store.state.dicBook
      }
    }
  }
</script>
