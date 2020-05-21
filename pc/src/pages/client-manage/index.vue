<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="客户名称" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="客户账号" prop="userAccount">
        <el-input v-model="formData.userAccount"></el-input>
      </el-form-item>

    </i-search>

    <i-table
      :tableData="tableData"
      :pageInfo="pageInfo"
      :selectionShow="false"
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
    
  
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'

import req from '@/api/client-manage.js'

export default {
  name: 'client-manage',
  components: {
    ISearch,
    ITable,
    IDialog
  },
  data () {
    return {
      formData: {},
      dialogFormData:{},
      dialogVisible:false,
      role:'',
      dialogTitle:'新增用户',
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      sexList:[
           {label:'男',value:'0'},
           {label:'女',value:'1'}
      ],
      columnList: [
        {label: '客户账号', prop: 'userAccount'},
        {label: '姓名', prop: 'userName'},
        {label: '性别', prop: 'userSex',distName:'sexList'},
        {label: '手机', prop: 'userPhone'},
        {label: '客户邮箱', prop: 'userEmail'},
        {label: '身份证', prop: 'userIdCard'}
      ],
      tableData: [
      ],
      list2:[],
         rules: {
         
         }
    }
  },
  mounted () {
       this.search()
  },
  methods: {
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
          this.tableData=this.list2
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
    },
  }
}
</script>
