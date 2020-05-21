<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户账号" prop="userAccount">
        <el-input v-model="formData.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="userRole">
         <el-select v-model="formData.userRole" placeholder="请选择">
              <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value">                
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
      align="center"
      :formatter="columnFormatter"
      >
      <!-- :formatter="columnFormatter" -->
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
          <el-form-item label="用户账号" prop="userAccount">
            <el-input v-model="dialogFormData.userAccount"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="dialogFormData.userName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="用户性别" prop="userSex">
           <el-select v-model="dialogFormData.userSex" placeholder="请选择性别">
             <el-option
              v-for="(item,index) in sexList"
              :key="index"
              :label="item.label"
              :value="item.value">
                
              </el-option>
           </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="手机号" prop="userPhone">
            <el-input v-model.number="dialogFormData.userPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="用户邮箱" prop="userEmail">
            <el-input v-model="dialogFormData.userEmail"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="身份证" prop="userIdCard">
            <el-input v-model="dialogFormData.userIdCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
              <el-row>
        <el-col :span="12">
          <el-form-item label="用户密码" prop="userPassword">
            <el-input v-model="dialogFormData.userPassword"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="用户角色" prop="userRole">
            <el-select v-model="dialogFormData.userRole" placeholder="请选择使用者">
              <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value">                
              </el-option>
    </el-select>

          </el-form-item>
        </el-col>
      </el-row>
              <el-row>
        <el-col :span="12">
          <el-form-item label="用户头像" prop="userProfile">
          <i-file v-model="dialogFormData.userProfile"></i-file>
          </el-form-item>
        </el-col>
      </el-row>


    </el-form>

    </i-dialog>
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import IFile from '@/components/common/i-file.vue'

import req from '@/api/user-manage.js'

export default {
  name: 'user-manage',
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
      dialogVisible:false,
      dialogTpye:'',
      userCode:[],
      dialogTitle:'',
      options:[
        {label:'管理员',value:'0'},
         {label:'店长',value:'1'}
      ],
      sexList:[
           {label:'男',value:'0'},
           {label:'女',value:'1'}
      ],
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func:()=>{
            console.log(this.dialogVisible)
            this.dialogVisible=true,
            this.dialogTpye='add'
            this.dialogTitle= '新增用户'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
           func:()=>{
               if (this.userCode.length===0) {
              this.$message.info('请选择需要修改的数据')

              return
            }
            this.dialogTpye = 'data'
            this.dialogVisible=true
            this.dialogTitle= '修改用户'
            req('getuserData',{userCode:this.userCode[0]}).then(data =>{
              this.dialogFormData = Object.assign({},data.data)
              this.dialogFormData.userPhone=parseInt(this.dialogFormData.userPhone)
              this.$message.success(data.msg)
              // console.log(req.data)
            })

            
          }
        },
        {
          btnName: '删除',
          type: 'primary',
           func:()=>{
                        if(this.userCode.length ===0){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
              req('deleteUser',{userCodeList:this.userCode}).then(data =>{
                this.$message.success(data.msg)
                 this.fetch()
              })
              return
            })
          }
        }
      ],
      columnList: [
        {label: '用户编号', prop: 'userCode'},
        {label: '用户账号', prop: 'userAccount'},
        {label: '用户姓名', prop: 'userName'},
        {label: '用户角色', prop: 'userRole',distName:'options'},
        {label: '用户性别', prop: 'userSex',distName:'sexList'},
        {label: '手机号', prop: 'userPhone'},
        {label: '用户邮箱', prop: 'userEmail'},
        {label: '身份证', prop: 'userIdCard'},
      ],
      tableData: [
      ],
      list2:[],
         rules: {
          userAccount:[  { required: true, message: '请输入用户账号', trigger: 'blur' },],
           userName:[  { required: true, message: '请输入用户姓名', trigger: 'blur' },],
           userSex:[  { required: true, message: '请输入用户性别', trigger: 'blur' },],
             userPhone:[  { message: '手机号为11位', trigger: 'blur', required: true,},
             {type:'number',message:'电话号码必须为数字'},
              {required: true,message:'请输入电话号码'}],
              userEmail:[  { required: true, message: '用户邮箱', trigger: 'blur' },],
               userIdCard:[  {  message: '身份证为18位', trigger: 'blur' , required: true,},
               { required: true, message: '请输入身份证号码', trigger: 'blur' },],
                userPassword:[  { required: true, message: '请输入用户密码', trigger: 'blur' },],
                 userRole:[  {required: true, message: '请输入用户角色', trigger: 'change'}],
         }
    }
  },
  mounted () {
    // this.pageInfo.total = this.tableData.length
    this.search()
    
  },
  methods: {
    fetch(){
      this.pageInfo.pageSize=5
      this.pageInfo.pageNum = 1
      this.search()
    },
    search () {
      req('getTableData',{
        ...this.formData,
        pageSize:this.pageInfo.pageSize,
        pageNum:this.pageInfo.pageIndex
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
      
    },
    reset () {
      console.log('重置按钮被点击了')
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
    //表单点击
    handleSelectionChange (rows){
      console.log(rows)
      this.userCode = []
      rows.forEach(item =>{
        this.userCode.push(item.userCode)+''
      })
      // console.log(this.userCode)
      // this.columnList.userCode = rows[0].userCode
    },
    dialogBeforeClose(){
      this.$refs.dialogFormData.resetFields()
    },
    dialogCancel(){
      this.dialogVisible=false
       this.$refs.dialogFormData.resetFields()
    },
    //头部点击
    dialogConfirm(){
      this.$refs.dialogFormData.validate((valid) => {
        if(valid){
          if(this.dialogTpye === 'add'){
          console.log('校验表单')
               req('addTableData',{...this.dialogFormData,

      }).then(data =>{
         this.dialogVisible =false
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
          this.$refs.dialogFormData.resetFields()
          console.log(this.dialogVisible)
        }else{
          this.$message.error(data.msg)
        }
      })}
      
      else {
            console.log('校验表单')
        req('changeTableData',{...this.dialogFormData,
        userCode:this.userCode[0]

      }).then(data =>{
         this.dialogVisible =false
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
          this.$refs.dialogFormData.resetFields()
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
    },
//     validateIdCard (rule, value, callback) {
// let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// console.log(reg.test(value))

// if (!reg.test(value)) {
// callback(new Error('请输入正确的身份证号'))
// } else {
// callback()
// }
// },
//       checkPhone (rule, value, callback) {
//         if (!(/^1[34578]\d{9}$/.test(value))) {
//           callback(new Error('请输入正确的手机号码!'));
//         }
//       }

  }
}
</script>
