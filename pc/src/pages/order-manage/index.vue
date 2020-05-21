<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
        <el-row>

      <el-form-item label="下单人" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
         
        
      <el-form-item label="订单编码" prop="orderCode">
        <el-input v-model="formData.orderCode"></el-input>
      </el-form-item>
       
      <el-form-item label="付款时间" prop="payTime">
          <el-row>
               <el-col :span="11"> 
        <el-date-picker v-model="formData.payStartTime"
            :picker-options="startTimePickerOptions"
            value-format='yyyy-MM-dd'
             >
            </el-date-picker>
               </el-col>
                <el-col :span="2" style="text-align: center;"> 
                    -
                    </el-col>
               <el-col :span="11"> 
             <el-date-picker v-model="formData.payEndTime"
            :picker-options="endTimePickerOptions"
            value-format='yyyy-MM-dd'
            >
            </el-date-picker>
          </el-col>
          </el-row>
      </el-form-item>
        </el-row>


      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model="formData.userPhone"></el-input>
      </el-form-item>

     <el-form-item label="订单状态" prop="orderActive">
          <el-select v-model="formData.orderActive" placeholder="全部">
               <el-option label="已下单" value="0"></el-option>
                 <el-option label="已取消" value="1"></el-option>
                 <el-option label="已到货" value="2"></el-option>
                 <el-option label="已取货" value="3"></el-option>
                 <el-option label="已完成未评价" value="4"></el-option>
                  <el-option label="已完成已评价" value="5"></el-option>
          </el-select>

      </el-form-item>
             



    </i-search>

   <i-table
      :toolbar="toolbar"
      :tableData="tableData"
      :pageInfo="pageInfo"
      :selectionShow="true"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @selection-change="handleSelectionChange">

      <el-table-column
      v-for="(item, index) in columnList"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      align="center"
      :formatter="columnFormatter">
      </el-table-column>
    </i-table>
    
    <el-dialog 
    :visible.sync="visible"
    :title="dialogTitle"
    >
    <el-table label-width="100px"
    border :data="orderData">

      <el-table-column
       v-for="(item, index) in orderList"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      align="center">
      </el-table-column>
         

    </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogCancel">关闭</el-button>
  </span>

    </el-dialog>
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'

import req from '@/api/order-manage.js'

export default {
  name: 'order-manage',
  components: {
    ISearch,
    ITable,
    IDialog
  },
  data () {
    return {
      formData: {},
      forData2:[],
      dialogFormData:{},
      visible:false,
      orderCode:[],
      role:'',
      dialogTitle:'订单详情',
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
       startTimePickerOptions:{
        disabledData:(value) =>{
          return this.dialogFormData.endTime<value
        }
      },
      endTimePickerOptions:{
        disabledData:(value) =>{
          return this.dialogFormData.startTime>value
        }
      },
             options:[
        {label:'已下单',value:'0'},
        {label:'已取消',value:'1'},
        {label:'已到货',value:'2'},
        {label:'已取货',value:'3'},
        {label:'已完成未评价',value:'4'},
        {label:'已完成已评价',value:'5'},
      ],
      toolbar: [
        {
          btnName: '详情',
          type: 'primary',
          func:()=>{
             if (this.orderCode.length===0) {
              this.$message.info('请选择需要查看的数据')

              return
                                                 }
            this.visible=true,
            req('findOrder',{
              orderCode:this.orderCode[0]
            }).then(data =>{
               this.orderData=data.data
               console.log(this.orderData)
            })
          }
        },
        {
          btnName: '订单取消',
          type: 'primary',
           func:()=>{
                          if (this.orderCode.length===0) {
              this.$message.info('请选择数据')

              return
                                                 }
          req('updateOrderActive',{
              orderCodeList:this.orderCode+',',
              orderActive:1,
              versionList:this.versionList+','
            }).then(data =>{
              console.log(this.orderCode)
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
        {
          btnName: '订单到货',
          type: 'primary',
           func:()=>{
                                       if (this.orderCode.length===0) {
              this.$message.info('请选择数据')

              return
                                                 }
          req('updateOrderActive',{
              orderCodeList:this.orderCode+',',
              orderActive:2,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
           {
          btnName: '取消到货',
          type: 'primary',
           func:()=>{
                                       if (this.orderCode.length===0) {
              this.$message.info('请选择数据')

              return
                                                 }
          req('updateOrderActive',{
              orderCodeList:this.orderCode+',',
              orderActive:0,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
           {
          btnName: '订单已取货',
          type: 'primary',
           func:()=>{
                                       if (this.orderCode.length===0) {
              this.$message.info('请选择数据')

              return
                                                 }
          req('updateOrderActive',{
              orderCodeList:this.orderCode+',',
              orderActive:3,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
                   {
          btnName: '取消已取货',
          type: 'primary',
           func:()=>{
                                       if (this.orderCode.length===0) {
              this.$message.info('请选择数据')

              return
                                                 }
          req('updateOrderActive',{
              orderCodeList:this.orderCode+',',
              orderActive:2,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
        
      ],
      columnList: [
        {label: '订单编码', prop: 'orderCode'},
        {label: '订单总价', prop: 'sumPrice'},
        {label: '订单状态', prop: 'orderActive',distName:'options'},
        // {label: '支付状态', prop: 'storeCode'},
        {label: '门店编码', prop: 'storeCode'},
        {label: '下单人姓名', prop: 'payUser'},
        {label: '下单人手机号', prop: 'payPhone'},
        {label: '确认付款时间', prop: 'payTime'}
      ],
      orderList:[
        {label: '用户编号', prop: 'userCode'},
        {label: '订单编码', prop: 'orderCode'},
        {label: '商品编码', prop: 'goodsCode'},
        // {label: '支付状态', prop: 'storeCode'},
        {label: '商品名称', prop: 'goodsName'},
        {label: '购买数量', prop: 'pucharNum'},
        {label: '总金额', prop: 'sumPrice'},
        {label: '售价', prop: 'goodsPrice'},
         {label: '定价', prop: 'goodsCostPrice'}
      ],
      tableData: [

      ],
      orderData:[],
         rules: {
         
         }
    }
  },
  methods: {
    dialogCancel(){
      this.visible=false
    },
     fetch(){
      this.pageInfo.pageSize=5
      this.pageInfo.pageIndex = 1
      this.search()
    },
    search () {
              req('getTop',).then(data =>{
         this.role=data.data.role
         req('getTableData',{
        ...this.formData,
        pageSize:this.pageInfo.pageSize,
        pageNum:this.pageInfo.pageIndex,
        role:this.role
      }).then(data =>{
        if(data.code ==='200'){
        this.tableData = data.data.list
        this.pageInfo.pageIndex = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
        this.pageInfo.total = data.data.total
        }else{
          this.tableData = this.forData2
        }
      })
       })
       
    },
    reset () {
      this.fetch()
    },
    handleSizeChange (value) {
           this.pageInfo.pageSize = value
      this.search()
    },
    handleCurrentChange (value) {
      this.pageInfo.pageIndex = value
     this.search()
    },
    handleSelectionChange (rows){
     console.log(rows)
      this.orderCode = []
      rows.forEach(item =>{
        this.orderCode.push(item.orderCode)+','
      }),
        this.versionList = []
      rows.forEach(item =>{
        this.versionList.push(item.version)+','
      })
    },
    dialogBeforeClose(){
      console.log('11')
    },
        dialogCancel(){
      this.visible=false
    },
    dialogConfirm(){
      this.$refs.dialogFormData.validate((valid) => {
        if(valid){
          console.log('校验表单')
        }else{
          return false
        }
      })
    },
                columnFormatter (row,column,cellValue,index){
      let distName = this.columnList.filter(item =>{
        return item.prop === column.property
      })[0].distName

      if(distName){
        return this[distName].filter(item =>{
          return item.value === row[column.property]
        })[0].label
      }else{
        return row[column.property]
      }
      }
  },
    mounted () {
      this.search()
  },

}
</script>
