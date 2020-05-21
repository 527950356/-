<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="formData.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" prop="goodsCode">
        <el-input v-model="formData.goodsCode"></el-input>
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
    <el-form :model="dialogFormData" ref="dialogFormData"  :rules="rules"  label-width="108px">

      <el-row :gutter="20">
  <el-col :span="12" :offset="6">
          <el-form-item label="商品编号" prop="goodsCode">
            <comm-Select v-model="dialogFormData.goodsCode"></comm-Select>
          </el-form-item>
  </el-col>
</el-row>
        
            <el-row :gutter="20">
  <el-col :span="12" :offset="6">
                 <el-form-item label="热门商品排序" prop="hotGoodsSortNum">
            <el-input v-model="dialogFormData.hotGoodsSortNum"></el-input>
          </el-form-item>
  </el-col>
</el-row>
     



    </el-form>

    </i-dialog>
     <el-dialog 
    :visible.sync="visible"
    :title="dialogTitle2"
    >
     <el-form :model="dialogFormData2" ref="dialogFormData2"   label-width="100px">
                <el-row :gutter="20">
         <el-col :span="12" :offset="6">
                 <el-form-item label="展示数量" prop="hotGoodsShowNum">
            <el-input v-model="dialogFormData2.hotGoodsShowNum"></el-input>
          </el-form-item>
         </el-col>
                </el-row>
     </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button  @click="dialogConfirm2">确定</el-button>
    <el-button @click="dialogCancel2">关闭</el-button>
  </span>

    </el-dialog>
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import CommSelect from './comm-select.vue'

import req from '@/api/hot-comm-manage.js'

export default {
  name: 'hot-comm-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    CommSelect 
  },
  data () {
    return {
      formData: {},
      dialogFormData:{},
       dialogFormData2:{},
      dialogVisible:false,
      hotGoodsCode :[],
      visible:false,
      dialogTitle:'新增用户',
      dialogTitle2:"展示数量设置",
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
            this.dialogTitle= '新增热门商品'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
           func:()=>{
                            if (this.hotGoodsCode.length===0) {
              this.$message.info('请选择需要修改的数据')

              return
            }
            this.dialogTpye = 'data'
            this.dialogVisible=true
            this.dialogTitle= '修改热门商品'
            req('getuserData',{hotGoodsCode:this.hotGoodsCode[0]}).then(req =>{
              this.dialogFormData = Object.assign({},req.data)
              // console.log(req.data)
            })
          }
        },
        {
          btnName: '删除',
          type: 'primary',
           func:()=>{
            if(this.hotGoodsCode.length ===0){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
              req('deleteUser',{hotGoodsCodeList:this.hotGoodsCode}).then(data =>{
                this.$message.success(data.msg)
                this.fetch()
              })
              return
            })
          }
        },
            {
          btnName: '展示数量设置',
          
          type: 'primary',
           func:()=>{
             this.visible=true
            req('findHotGoodsShowNum').then(data =>{
                this.dialogFormData2 = Object.assign({},data.data)
                console.log(this.dialogFormData2 )
                this.search()
            })
          }
        }
      ],
      columnList: [
        {label: '排序', prop: 'hotGoodsSortNum'},
        {label: '商品编号', prop: 'goodsCode'},
        {label: '商品名称', prop: 'goodsName'},
        {label: '商品价格', prop: 'goodsPrice'},
        {label: '商品介绍', prop: 'goodsIntroduce'},
      ],
      tableData: [
      ],
         rules: {
          goodsCode:[  { required: true, message: '请输入商品编号', trigger: 'blur' },],
           hotGoodsSortNum:[  { required: true, message: '请输入热门商品排序', trigger: 'blur' },],
            
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
       }),
            req('getTableData',{
        ...this.formData,
        pageSize:this.pageInfo.pageSize,
        pageNum:this.pageInfo.pageIndex,
      }).then(data =>{
        this.tableData = data.data.list
        this.pageInfo.pageIndex = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
        this.pageInfo.total = data.data.total
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
      this.hotGoodsCode = []
      rows.forEach(item =>{
        this.hotGoodsCode.push(item.hotGoodsCode)+','
      })
    },
    dialogBeforeClose(){
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
          this.search()
           this.$message.success(data.msg)
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
        hotGoodsCode:this.hotGoodsCode[0]

      }).then(data =>{
        this.fetch()
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
    },dialogCancel2(){
      this.visible=false
      this.$refs.dialogFormData2.resetFields()
    },
    dialogConfirm2(){
      req('updateHotGoodsShowNum',{
        hotGoodsShowNum:this.dialogFormData2.hotGoodsShowNum,
        version:this.dialogFormData2.version
      }).then(data =>{
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
          this.$refs.dialogFormData2.resetFields()
          this.visible=false
        }else{
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>
