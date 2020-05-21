<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="状态" prop="rotateActive">
          <el-select v-model="formData.rotateActive" placeholder="全部">
               <el-option label="启用" value="0"></el-option>
                 <el-option label="禁用" value="1"></el-option>
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
      <template slot-scope="scope">
       <el-button v-if="item.prop ==='watch'" type="text" @click="watchImg(scope.row)">
         预览
       </el-button>
       <span v-else>{{filterDist(scope.row[item.prop],item)}}</span>
      </template>
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
          <el-form-item label="轮播图片" prop="rotateImagePath">
          <i-file v-model="dialogFormData.rotateImagePath"></i-file>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="排序" prop="rotateSortNum">
            <el-input v-model="dialogFormData.rotateSortNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="有效期起" prop="startTime">
            <el-date-picker 
            v-model="dialogFormData.startTime"
            :picker-options="startTimePickerOptions"
            value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="有效期止" prop="endTime" >
                        <el-date-picker v-model="dialogFormData.endTime"
            :picker-options="endTimePickerOptions"
            value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="商品" prop="goodsCode">
            <comm-Select v-model="dialogFormData.goodsCode"></comm-Select>
          </el-form-item>
        </el-col>
         
      </el-row>
            
    </el-form>

    </i-dialog>
    <el-dialog 
    :visible.sync="visible"
    :title="dialogTitle"
    >
    <img class="dd" :src='topimgs'/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogCancel">关闭</el-button>
  </span>

    </el-dialog>
  </div>
</template>

<script>
 import imga from "../img/u0.jpg"
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import IFile from '@/components/common/i-file.vue'
import CommSelect from './comm-select.vue'

import req from '@/api/home-pic-manage.js'

export default {
  name: 'home-pic-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    CommSelect,
     IFile
  },
  data () {
    return {
      topimgs:imga,
      formData: {},
      dialogFormData:{},
      rotateCode:[],
      dialogVisible:false,
      dialogTitle:'新增用户',
      visible:false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      startTimePickerOptions:{
        disabledData:(value) =>{
          console.log(value)
          return this.dialogFormData.endTime < value
        }
      },
      endTimePickerOptions:{
        disabledData:(value) =>{
          return this.dialogFormData.startTime > value
        }
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func:()=>{
            console.log(this.dialogVisible)
            this.dialogVisible=true,
            this.dialogTpye='add'
            this.dialogTitle= '新增轮播图'
          }
        },
        {
          btnName: '删除',
          type: 'primary',
           func:()=>{
            if(this.rotateCode.length ===0){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
              req('deleteUser',{rotateCodeList:this.rotateCode}).then(data =>{
                this.$message.success(data.msg)
                this.fetch()
              })
              return
            })
          }
        },
                {
          btnName: '启用',
          type: 'primary',
           func:()=>{
              if(this.rotateCode.length ===0){
              this.$message.info('请选择数据')
              return}
            req('changeTableData',{
              rotateCodeList:this.rotateCode+',',
              rotateActive:0,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
                {
          btnName: '禁用',
          type: 'primary',
           func:()=>{
                if(this.rotateCode.length ===0){
              this.$message.info('请选择数据')
              return}
            req('changeTableData',{
              rotateCodeList:this.rotateCode+',',
              rotateActive:1,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
      ],
      columnList: [
        {label: '排序', prop: 'rotateSortNum'},
        {label: '图片路径', prop: 'rotateImagePath'},
        {label: '状态', prop: 'rotateActive' ,distName:'options'},
        {label: '图片', prop: 'watch',distName:'rotateImagePath'},
        {label: '有效期起', prop: 'startTime'},
        {label: '有效期止', prop: 'endTime'},
      ],
      tableData: [
      ],
      list2:[],
       options:[
        {label:'启用',value:'0'},
        {label:'禁用',value:'1'},
      ],
         rules: {
          rotateImagePath:[  { required: true, message: '请输入轮播图片', trigger: 'blur' },],
           rotateSortNum:[  { required: true, message: '请输入排序', trigger: 'blur' },],
           startTime:[  { required: true, message: '请输入有效期起', trigger: 'blur' },],
             endTime:[  { required: true, message: '请输入有效期止', trigger: 'blur' },],
              goodsCode:[  { required: true, message: '请输入商品编号', trigger: 'change' },],
              
         }
    }
  },
  mounted () {
   this.fetch()
  },
  methods: {
    inputChange(event){
      
    },
    fetch(){
      this.pageInfo.pageSize=5
      this.pageInfo.pageNum = 1
      this.search()
    },
    search () {
       req('getTop',).then(data =>{
         this.role=data.data.role
       }),
                  req('getTableData',{
        ...this.formData,
        pageSize:this.pageInfo.pageSize,
        pageNum:this.pageInfo.pageIndex,
      }).then(data =>{
        if(data.code =='200'){
        this.tableData = data.data.list
        this.pageInfo.pageIndex = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
        this.pageInfo.total = data.data.total
        }else{
          this.tableData =this.list2
        }
      })
    },
    reset () {
      console.log('重置按钮被点击了')
    },
    handleSizeChange (value) {
      this.pageInfo.pageSize = value
       this.fetch()
    },
    handleCurrentChange (value) {
     this.pageInfo.pageIndex = value
     this.fetch()
    },
    handleSelectionChange (rows){
     console.log(rows)
      this.rotateCode = []
      rows.forEach(item =>{
        this.rotateCode.push(item.rotateCode)+','
      })
      this.rotateActive = []
      rows.forEach(item =>{
        this.rotateActive.push(item.rotateActive)
      })
       this.versionList = []
      rows.forEach(item =>{
        this.versionList.push(item.version)
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
          this.dialogVisible =false
          this.fetch()
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


      watchImg(data){
        // window.open(data.rotateImagePath)
        this.topimgs=data.rotateImagePath
        console.log(data.rotateImagePath)
        this.visible=true
         this.dialogTitle= '预览'
        
      },
      dialogCancel(){
        this.visible=false
      },
      filterDist(value,item){
        if(item.distName){
          return this[item.distName].filter(distItem =>{
            return distItem.value ===value
          })[0].label
        }else{
          return value
        }
      }

  }
}
</script>
<style scoped>
.dd{
      width: 300px;
    position: relative;
    left: 312px;
}
</style>
