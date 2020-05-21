<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
        <el-row>

      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="formData.goodsName"></el-input>
      </el-form-item>
        
          
      <el-form-item label="商品状态" prop="goodsActive">
                 <el-select v-model="formData.goodsActive" placeholder="请选择">
              <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value">                
              </el-option>
         </el-select>
      </el-form-item>

      <el-form-item label="广告词" prop="goodsAdvertise">
        <el-input v-model="formData.goodsAdvertise"></el-input>
      </el-form-item>
  
        </el-row>


      <el-form-item label="出版社" prop="goodsAuthor">
        <el-input v-model="formData.goodsAuthor"></el-input>
      </el-form-item>

      <el-form-item label="作者" prop="goodsPublish">
        <el-input v-model="formData.goodsPublish"></el-input>
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
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="dialogFormData.goodsName"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="书号" prop="isbn">
            <el-input v-model="dialogFormData.isbn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="一级分类" prop="firstCateCode">
            <el-select v-model="dialogFormData.firstCateCode" placeholder="请选择" @change="gettwo">
              <el-option
              v-for="(item,index) in bookoptions"
              :key="index"
              :label="item.goodsCateName"
              :value="item.goodsCateCode">                
              </el-option>
         </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="二级分类" prop="secondCateCode">
            <el-select v-model="dialogFormData.secondCateCode" placeholder="请选择" >
              <el-option
              v-for="(item,index) in  secendbookoptions"
              :key="index"
              :label="item.goodsCateName"
              :value="item.goodsCateCode">                
              </el-option>
         </el-select>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="广告词" prop="goodsAdvertise">
            <el-input v-model="dialogFormData.goodsAdvertise" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="商品介绍" prop="goodsIntroduce" type="textarea" :rows="2">
            <el-input v-model="dialogFormData.goodsIntroduce"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
              <el-row>
        <el-col :span="12">
          <el-form-item label="商家名称" prop="sallerName">
           <el-select v-model="dialogFormData.sallerName" placeholder="请选择">
              <el-option
              v-for="(item,index) in  sellbookoptions"
              :key="index"
              :label="item.label"
              :value="item.value">                
              </el-option>
         </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="库存" prop="goodsStock">
            <el-input v-model="dialogFormData.goodsStock"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
                    <el-row>
        <el-col :span="12">
          <el-form-item label="成本价" prop="goodsCostPrice">
            <el-input v-model="dialogFormData.goodsCostPrice"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="在售价" prop="goodsPrice">
            <el-input v-model="dialogFormData.goodsPrice"></el-input>

          </el-form-item>
        </el-col>
      </el-row>
                         <el-row>
        <el-col :span="12">
          <el-form-item label="作者" prop="goodsAuthor">
            <el-input v-model="dialogFormData.goodsAuthor"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="出版社" prop="goodsPublish">
            <el-input v-model="dialogFormData.goodsPublish"></el-input>

          </el-form-item>
        </el-col>
      </el-row>
                          <el-row>
        <el-col :span="12">
          <el-form-item label="图片" prop="goodsImagePath">
             <i-file v-model="dialogFormData.goodsImagePath"></i-file>
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

import req from '@/api/comm-manage.js'

export default {
  name: 'comm-manage',
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
      tableSelectRows: [],
      goodsCode:[],
      dialogTitle:'新增用户',
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      options:[
        {label:'已售完',value:'0'},
        {label:'在售',value:'1'},
         {label:'已下架',value:'2'},
         {label:'未发布',value:'3'}
      ],
      bookoptions:[
         
      ],
          secendbookoptions:[
      ],
      sellbookoptions:[
        {label:'当当网',value:'当当网'},
          {label:'新华书店',value:'新华书店'},
          {label:'先锋书店',value:'先锋书店'},
      ],
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func:()=>{
           this.dialogVisible=true,
            this.dialogTpye='add'
            this.dialogTitle= '新增商品'
            req('listGoodsCate',{
        cateParentCode:0
       
      }).then(data =>{
        this.bookoptions = data.data
        console.log(this.bookoptions)
      })


          }
        },
        {
          btnName: '修改',
          type: 'primary',
           func:()=>{
            this.dialogTpye = 'data'
            this.dialogVisible=true
            this.dialogTitle= '修改商品'
            req('getuserData',
            {goodsCode:this.goodsCode[0],version:this.versionList[0]}).then(data =>{
              this.dialogFormData = Object.assign({},data.data)
              // console.log(req.data)

                          req('listGoodsCate',{
        cateParentCode:0
      }).then(data =>{
        this.bookoptions = data.data
        console.log(this.bookoptions)
      })
                                req('listGoodsCate',{
        cateParentCode:this.dialogFormData.firstCateCode
      }).then(data =>{
        this.secendbookoptions = data.data
        let num =0
                 data.data.map(item =>{
                   this.secendbookoptions[num].label=item.goodsCateName
                    this.secendbookoptions[num].value=item.goodsCateCode
                    num=num+1
                 })
      })
            })

          }
        },
        {
          btnName: '删除',
          type: 'primary',
           func:()=>{ if(this.goodsCode.length ===0){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
              req('deleteUser',{goodsCodeList:this.goodsCode}).then(data =>{
                if(data.code =='200'){
               this.$message.success(data.msg)
                this.fetch()
                }else{
                  this.$message.error(data.msg)
                }
              })
              return
            })
          }
        },
           {
          btnName: '上架',
          type: 'primary',
           func:()=>{
              if(this.goodsCode.length ===0){
              this.$message.info('请选择数据')
              return}
            req('updateGoodsActive',{
              goodsCodeList:this.goodsCode+',',
              goodsActive:1,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
           {
          btnName: '下架',
          type: 'primary',
           func:()=>{
                           if(this.goodsCode.length ===0){
              this.$message.info('请选择数据')
              return}
            req('updateGoodsActive',{
              goodsCodeList:this.goodsCode+',',
              goodsActive:2,
              versionList:this.versionList+','
            }).then(data =>{
              this.$message.success(data.msg)
              this.fetch()
            })
          }
        },
        
      ],
      columnList: [
        {label: '商品名称', prop: 'goodsName'},
        {label: '定价', prop: 'goodsCostPrice'},
        {label: '售价', prop: 'goodsPrice'},
        {label: '销售量', prop: 'goodsSallNum'},
        {label: '一级分类', prop: 'firstCateName'},
        {label: '二级分类', prop: 'secondCateName'},
        {label: '广告词', prop: 'goodsAdvertise'},
         {label: '商品介绍', prop: 'goodsIntroduce'},
          {label: '商品状态', prop: 'goodsActive',distName:'options'},
           {label: '上架时间', prop: 'goodsStartTime'},
            {label: '浏览量', prop: 'goodsViewNum'},
            {label: '商家编码', prop: 'goodsCode'},
            {label: '商家名称', prop: 'sallerName'},
            {label: '库存', prop: 'goodsStock'},
            {label: 'isbn书号', prop: 'isbn'},
        
      ],
      tableData: [
      ],
      list2:[],
         rules: {
          goodsName:[  { required: true, message: '请输入商品名称', trigger: 'blur' },],
           isbn:[  { required: true, message: '请输入书号', trigger: 'blur' },],
          firstCateCode:[  { required: true, message: '请输入一级分类编号', trigger: 'change' },],
              goodsAdvertise:[  { required: true, message: '请输入广告词', trigger: 'blur' },],
               goodsIntroduce:[  { required: true, message: '请输入商品介绍', trigger: 'blur' },],
               sallerName:[  { required: true, message: '请输入商家名称', trigger: 'change' },],
               goodsStock:[  {required: true, message: '请输入库存', trigger: 'blur'}],
                goodsCostPrice:[  {required: true, message: '请输入成本价', trigger: 'blur'}],
                goodsPrice:[  {required: true, message: '请输入在售价', trigger: 'blur'}],
                 goodsAuthor:[  {required: true, message: '请输入在作者', trigger: 'blur'}],
                  goodsPublish:[  {required: true, message: '请输入出版社', trigger: 'blur'}],
         }
    }
  },
  mounted () {
     this.search()
  },
  methods: {  
    gettwo(value){
      this.goodsCateCode = []
      this.bookoptions.forEach(item =>{
        this.goodsCateCode.push(item.goodsCateCode)
      })
        req('listGoodsCate',{
        cateParentCode:value
       
      }).then(data =>{
        this.secendbookoptions = data.data
      })
    },

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
       this.fetch()
    },
    handleCurrentChange (value) {
     this.pageInfo.pageIndex = value
     this.fetch()
    },
    //表格选择
    handleSelectionChange (rows){
      console.log(rows)
      this.goodsCode = [],
      rows.forEach(item =>{
        this.goodsCode.push(item.goodsCode)+''
      })
             this.versionList = []
      rows.forEach(item =>{
        this.versionList.push(item.version)+''
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
        this.dialogVisible=false
        this.fetch()
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
           this.$refs.dialogFormData.resetFields()
          this.dialogVisible=false
        }else{
          this.$message.error(data.msg)
        }
      })
      
      }
      
      else {
            console.log('校验表单')
        req('changeTableData',{...this.dialogFormData,
        goodsCode:this.goodsCode[0],
        version:this.versionList[0]

      }).then(data =>{
        this.dialogVisible=false
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.fetch()
          this.dialogVisible=false
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
      }
    


   }
}
</script>
