<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-row>
      <el-form-item label="司机编号" prop="driverCode">
        <el-input v-model="formData.driverCode"></el-input>
      </el-form-item>
      <el-form-item label="司机姓名" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
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

      </el-row>
     
      <el-form-item label="所在城市" prop="cityCode">
          <el-select v-model="formData.cityCode" placeholder="请选择"  @change="getarea">
                <el-option
              v-for="(item,index) in cityoptions"
              :key="index"
              :label="item.areaName"
              :value="item.areaCode">                
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="所在区" prop="areaCode">
          <el-select v-model="formData.areaCode" placeholder="请选择">
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
    <el-form :model="dialogFormData" ref="dialogFormData"  :rules="rules"  label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="司机姓名" prop="userName">
            <el-input v-model="dialogFormData.userName"></el-input>
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
          <el-form-item label="司机账号" prop="userAccount">
            <el-input v-model="dialogFormData.userAccount"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="密码" prop="userPassword">
            <el-input v-model="dialogFormData.userPassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="userIdCard">
            <el-input v-model="dialogFormData.userIdCard"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="所在省份" prop="provinceCode" placeholder="请选择">
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
      </el-row>
              <el-row>
        <el-col :span="12">
          <el-form-item label="所在城市" prop="cityCode" placeholder="请选择" >
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
          <el-form-item label="司机头像" prop="userProfile">
          <i-file v-model="dialogFormData.userProfile"></i-file>
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
       v-for="(item, index) in driverList"
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
import IFile from '@/components/common/i-file.vue'

import req from '@/api/driver-info-manage.js'

export default {
  name: 'driver-info-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
         IFile 
  },
  data () {
    return {
      formData: {},
      dialogFormData:{},
      dialogFormData2:{},
      driverCode:[],
      dialogVisible:false,
      visible:false,
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
              if (this.driverCode.length===0) {
              this.$message.info('请选择需要查看的数据')

              return
            }
            this.dialogTitle= '司机详情'
            this.visible=true,
            req('getuserData',{
              driverCode:this.driverCode[0],
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
            this.dialogTitle= '新增司机'
             req('listArea',{
              parentCode:0
       
      }).then(data =>{
        this.provinceoptions = data.data
      })
          }
        },
        {
          btnName: '修改',
          type: 'primary',
           func:()=>{
                            if (this.driverCode.length===0) {
              this.$message.info('请选择需要修改的数据')

              return
            }
            this.dialogTpye = 'edit'
            this.dialogVisible=true
            this.dialogTitle= '修改司机'
            req('getuserData',{driverCode:this.driverCode[0]
            }).then(data =>{
              this.dialogFormData = Object.assign({},data.data)
              // 城市
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
                        if(this.driverCode.length ===0){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
              req('deleteUser',{driverCodeList:this.driverCode}).then(data =>{
                this.$message.success(data.msg)
                 this.fetch()
              })
              return
            })
          }
        }
      ],
      columnList: [
        {label: '司机编号', prop: 'driverCode'},
        {label: '姓名', prop: 'userName'},
        {label: '手机', prop: 'phone'},
        {label: '身份证', prop: 'userIdCard'},
        {label: '账号', prop: 'userAccount'},
        
      ],
      driverList: [
        {label: '司机姓名', prop: 'userName'},
        {label: '联系电话', prop: 'phone'},
        {label: '身份证号', prop: 'userIdCard'},
        {label: '省级名称', prop: 'provinceName'},
        {label: '市级名称', prop: 'cityName'},
         {label: '区级名称', prop: 'areaName'},
        
      ],
      tableData: [
      ],
      orderData:[],
      list2:[],
         rules: {
          userName:[  { required: true, message: '请输入司机姓名', trigger: 'blur' },],
           phone:[  { required: true, message: '请输入联系电话', trigger: 'blur' },],
            userAccount:[  { required: true, message: '请输入司机账号', trigger: 'blur' },],
             userPassword:[  { required: true, message: '请输入司机密码', trigger: 'blur' },],
              userIdCard:[  { required: true, message: '请输入身份证号', trigger: 'blur' },],
               provinceCode:[  { required: true, message: '请输入省级编号', trigger: 'change' },],
                cityCode:[  { required: true, message: '请输入市级编号', trigger: 'change' },],
                 areaCode:[  {required: true, message: '请选择区级编号', trigger: 'change'}],
         }
    }
  },
  mounted () {
    // this.pageInfo.total = this.tableData.length
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
        if(data.code === '200'){
        this.tableData = data.data.list
        this.pageInfo.pageIndex = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
        this.pageInfo.total = data.data.total}
        else{
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
      this.driverCode = []
      rows.forEach(item =>{
        this.driverCode.push(item.driverCode)+','
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
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
          this.dialogVisible =false
          this.$refs.dialogFormData.resetFields()
        }else{
          this.$message.error(data.msg)
        }
      })}
      
      else {
            console.log('校验表单')
        req('changeTableData',{...this.dialogFormData,
        driverCode:this.driverCode[0]

      }).then(data =>{
        console.log(data.code)
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
