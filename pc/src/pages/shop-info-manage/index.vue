<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-row>
      <el-form-item label="门店编号" prop="storeCode">
        <el-input v-model="formData.storeCode"></el-input>
      </el-form-item>
      <el-form-item label="门店名称" prop="storeName">
        <el-input v-model="formData.storeName"></el-input>
      </el-form-item>
      <el-form-item label="店长名称" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      </el-row>
      <el-form-item label="所在省份" prop="provinceCode">
       <el-select v-model="formData.provinceCode" placeholder="请选择" @change="getcity">
                <el-option
              v-for="(item,index) in provinceoptions"
              :key="index"
             :label="item.areaName"
              :value="item.areaCode">                   
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="所在城市" prop="cityCode">
         
               <el-select v-model="formData.cityCode" placeholder="请选择" @change="getarea">
                <el-option
              v-for="(item,index) in cityoptions"
              :key="index"
              :label="item.areaName"
              :value="item.areaCode">               
              </el-option>
          </el-select>

      </el-form-item>
      <el-form-item label="所在区" prop="areaCode">
            <el-select v-model="formData.areaCode" placeholder="请选择" >
               <el-option
              v-for="(item,index) in areaoptions"
              :key="index"
              :label="item.areaName"
              :value="item.areaCode">                 
              </el-option>
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
      align="center">
      </el-table-column>
    </i-table>
    
    <i-dialog v-model="dialogVisible"
    :title="dialogTitle"
    @dialog-before-close="dialogBeforeClose"
    @dialog-cancel="dialogCancel"
    @dialog-confirm="dialogConfirm">
    <el-form :model="dialogFormData" ref="dialogFormData"  :rules="rules"  label-width="107px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="门店名称" prop="storeName">
            <el-input v-model="dialogFormData.storeName"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="dialogFormData.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="店长编号" prop="userCode">
            <el-input v-model="dialogFormData.userCode"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="营业执照编码" prop="businessCode">
            <el-input v-model="dialogFormData.businessCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="所在省份" prop="provinceCode">
            <el-select v-model="dialogFormData.provinceCode" placeholder="请选择" @change="getcity">
                <el-option
              v-for="(item,index) in provinceoptions"
              :key="index"
               :label="item.areaName"
              :value="item.areaCode">                   
              </el-option>
          </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="所在城市" prop="cityCode">
           <el-select v-model="dialogFormData.cityCode" placeholder="请选择" @change="getarea">
                <el-option
              v-for="(item,index) in cityoptions"
              :key="index"
              :label="item.areaName"
              :value="item.areaCode">                 
              </el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-row>
              <el-row>
        <el-col :span="12">
          <el-form-item label="所在区" prop="areaCode">
            <el-select v-model="dialogFormData.areaCode" placeholder="请选择">
               <el-option
              v-for="(item,index) in areaoptions"
              :key="index"
              :label="item.areaName"
              :value="item.areaCode">                 
              </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        
      </el-row>
                <el-row>
        <el-col :span="12">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="dialogFormData.address" type="textarea"
  :rows="2"></el-input>
          </el-form-item>
        </el-col>
        
      </el-row>



    </el-form>

    </i-dialog>
    <el-dialog 
    :visible.sync="visible"
    :title="dialogTitle"
    >
    <el-table label-width="100px"
    border 
    :data="orderData">

      <el-table-column
       v-for="(item, index) in shopList"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      align="center">
      </el-table-column>
         

    </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="haha">关闭</el-button>
  </span>

    </el-dialog>
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'

import req from '@/api/shop-info-manage.js'


export default {
  name: 'shop-info-manage',
  components: {
    ISearch,
    ITable,
    IDialog
  },
  data () {
    return {
      formData: {},
      dialogFormData:{},
      visible:false,
      storeCode:[],
      dialogVisible:false,
      dialogTitle:'新增用户',
       role:'',
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
          provinceoptions:[
       
      ],
            cityoptions:[
       
      ],
            areaoptions:[
      
      ],
      toolbar: [
        {
          btnName: '详情',
          type: 'primary',
          func:()=>{
                                      if (this.storeCode.length===0) {
              this.$message.info('请选择需要查看的数据')

              return
            }
            this.dialogTitle= '门店详情'
            this.visible=true,
            req('getuserData',{
              storeCode:this.storeCode[0],
              message:123
            }).then(data =>{
               this.orderData=data.data.list
            })
          }
        },
        {
          btnName: '新增',
          type: 'primary',
          func:()=>{
           console.log(this.dialogVisible)
            this.dialogVisible=true,
            this.dialogTpye='add'
            this.dialogTitle= '新增门店'
                        req('listArea',{
              parentCode:0
       
      }).then(data =>{
        this.provinceoptions = data.data
        console.log(this.provinceoptions)
      })
          }
        },
        {
          btnName: '修改',
          type: 'primary',
           func:()=>{
                             if (this.storeCode.length===0) {
              this.$message.info('请选择需要修改的数据')

              return
            }
                      this.dialogTpye = 'data'
            this.dialogVisible=true
            this.dialogTitle= '修改门店'
            req('getuserData',{storeCode:this.storeCode[0]}).then(data =>{
              this.dialogFormData = Object.assign({},data.data)
                           req('listArea',{
                parentCode:this.dialogFormData.provinceCode
              }).then(data =>{
                 this.cityoptions = data.data
                 let num =0
                 data.data.map(item =>{
                   this.cityoptions[num].label=item.areaName
                    this.cityoptions[num].value=item.areaCode
                    num=num+1
                 })
              })
              //  区
                          req('listArea',{
                parentCode:this.dialogFormData.cityCode
              }).then(data =>{
                 this.areaoptions = data.data
                 let num =0
                 data.data.map(item =>{
                   this.areaoptions[num].label=item.areaName
                    this.areaoptions[num].value=item.areaCode
                    num=num+1
                 })
              })
            })

          }
        },
        {
          btnName: '删除',
          type: 'primary',
           func:()=>{
            if(this.storeCode.length ===0){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
              req('deleteUser',{storeCodeList:this.storeCode}).then(data =>{
               this.$message.success(data.msg)
               this.search()
              })
              return
            })
          }
        }
      ],
      columnList: [
        {label: '门店编号', prop: 'storeCode'},
        {label: '门店名称', prop: 'storeName'},
        {label: '电话', prop: 'phone'},
        {label: '详细地址', prop: 'address'},
        {label: '店长姓名', prop: 'userName'},
        {label: '邀请码', prop: 'inviteCode'},
         {label: '门店账号', prop: 'userAccount'},
        
      ],
       shopList: [
        {label: '门店名称', prop: 'storeName'},
        {label: '电话', prop: 'phone'},
        {label: '用户编号', prop: 'userCode'},
        {label: '营业执照编码', prop: 'businessCode'},
        {label: '省级名称', prop: 'provinceName'},
        {label: '市级名称', prop: 'cityName'},
         {label: '区级名称', prop: 'areaName'},
          {label: '详细地址', prop: 'address'},
           {label: '门店编号', prop: 'storeCode'},
        
      ],
      tableData: [
      ],
            orderData:[],
      list2:[],
         rules: {
          storeName:[  { required: true, message: '请输入门店名称', trigger: 'blur' },],
           phone:[  { required: true, message: '请输入联系电话', trigger: 'blur' },],
            userCode:[  { required: true, message: '请输入店长（用户）编号', trigger: 'blur' },],
             businessCode:[  { required: true, message: '请输入营业执照编码', trigger: 'blur' },],
              provinceCode:[  { required: true, message: '请输入省级编号', trigger: 'blur' },],
               cityCode:[  { required: true, message: '请输入市级编号', trigger: 'blur' },],
                areaCode:[  { required: true, message: '请输入区级编号', trigger: 'blur' },],
                 address:[  {required: true, message: '请选择详细地址', trigger: 'change'}],
         }
    }
  },
  mounted () {
    this.search()
     req('listArea',{
              parentCode:0
       
      }).then(data =>{
        this.provinceoptions = data.data
      })
  },
  methods: {
    haha(){
      this.visible=false
    },
       getcity(value){
        req('listArea',{
        parentCode:value
      }).then(data =>{
        this.cityoptions = data.data
        console.log(this.cityoptions)
      })

    },
    getarea(value){
    req('listArea',{
        parentCode:value     
      }).then(data =>{
        this.areaoptions = data.data
      })
    },
        fetch(){
      this.pageInfo.pageSize=5
      this.pageInfo.pageNum = 1
      this.search()
    },
    search () {
      req('getTop').
      then(data =>{
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
          this.tableData = this.list2
        }
      })
      })
    },
    reset () {
      console.log('重置按钮被点击了')
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
      this.storeCode = []
      rows.forEach(item =>{
        this.storeCode.push(item.storeCode)+','
      })
    },
    dialogBeforeClose(){
      console.log('11')
      this.$refs.dialogFormData.resetFields()
    },
    dialogCancel(){
      this.dialogVisible=false
       this.$refs.dialogFormData.resetFields()
    },
    dialogConfirm(){
      this.$refs.dialogFormData.validate((valid) => {
        if(valid){
          if(this.dialogTpye === 'add'){
          console.log('校验表单')
               req('addTableData',{...this.dialogFormData,

      }).then(data =>{
        this.fetch()
           this.$refs.dialogFormData.resetFields()
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
          this.$refs.dialogFormData.resetFields()
          this.dialogVisible =false
          console.log(this.dialogVisible)
        }else{
          this.$message.error(data.msg)
        }
      })}
      
      else {
            console.log('校验表单')
        req('changeTableData',{...this.dialogFormData,
        storeCode:this.storeCode[0]

      }).then(data =>{
          this.dialogVisible =false
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
          this.dialogVisible  =false
          console.log(this.dialogVisible)
        }else{
          this.$message.error(data.msg)
        }
      })
      }

        }else{
          return false
        }
      })
    }
  }
}
</script>
