<template>
    <div class="container">
    <div class="left">
        <div class="top">
         <el-button v-for="(item, index) in toolbar" :key="index" :type="item.type" @click="item.func">
        {{item.btnName}}
      </el-button>
        </div>
        <div class="bootom">
            <el-tree :data="menuData" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
          

        </div>

    </div>
    <div class="right">
         <div class="top">
           分类详情
         </div>
        <div class="bootom">
          <el-form label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类名称" prop="goodsCateName">
               <el-input v-model="menuFormData.goodsCateName"></el-input>
               </el-form-item>
            </el-col>
                        <el-col :span="12">
              <el-form-item label="备注" prop="goodsCateRemark">
               <el-input v-model="menuFormData.goodsCateRemark"></el-input>
               </el-form-item>
            </el-col>
          </el-row>
                   
          </el-form>
        </div>
    </div>
     <i-dialog v-model="dialogVisible"
    :title="dialogTitle"
    @dialog-before-close="dialogBeforeClose"
    @dialog-cancel="dialogCancel"
    @dialog-confirm="dialogConfirm">
    <el-form :model="dialogFormData" ref="dialogFormData"  :rules="rules"  label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类名称" prop="goodsCateName">
            <el-input v-model="dialogFormData.goodsCateName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
      
        <el-col :span="12">
          <el-form-item label="备注" prop="goodsCateRemark">
            <el-input v-model="dialogFormData.goodsCateRemark"></el-input>
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

import req from '@/api/comm-classify-manage.js'
export default {
      name: 'comm-classify-manage',
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
      dialogTitle:'新增用户',
      menuFormData: {},
      menuFormData2:{},
      tableSelectRows1:[],
      tableSelectRows: {},
      goodsCateCode1:'',
      haha:0,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
            menuData: [
      ],
       options:[
        {label:'菜单',value:'0'},
         {label:'目录',value:'1'}
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func:()=>{
            this.dialogVisible=true
            console.log(this.dialogVisible)
            this.dialogVisible=true,
            this.dialogTpye='add'
            this.dialogTitle= '新增分类'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
           func:()=>{
             if(this.tableSelectRows ===''){
              this.$message.info('请选择需要修改的数据')
              return}
        req('changeTableData',{
              ...this.menuFormData,
              version:this.tableSelectRows.version,
               goodsCateCode: this.tableSelectRows.goodsCateCode,
            }).then(data =>{
              if(data.code==='200'){
                this.$message.success(data.msg)
                this.fetch()
              }
            })
          }
        },
        {
          btnName: '删除',
          type: 'primary',
           func:()=>{
                 if(this.tableSelectRows.length ===''){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
     req('deleteUser',{
        goodsCateCode: this.tableSelectRows.goodsCateCode,
        version:this.tableSelectRows.version
     }).then(data =>{
       if(data.code =='200'){
         this.menuFormData=this.menuFormData2
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
          btnName: '刷新',
          type: 'primary',
           func:()=>{
             this.fetch()
          }
        },
      ],
           data: [ 
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      menuList: [
      ],
       rules:{
         goodsCateName:[  { required: true, message: '请输入分类名称', trigger: 'blur' },],
      }
    }
    
},
mounted(){
      req('getTableData', {
      }).then(data => {
        this.menuData = data.data
        let num1 = 0
        data.data.filter(item => {
          this.menuData[num1].label = item.goodsCateName
          this.menuData[num1].children = item.secondList
          
          let num2 = 0
          item.secondList.filter(item =>{
            this.menuData[num1].children[num2].label=item.goodsCateName
            num2=num2+1
          })
          num1 = num1 + 1
        })

      })
},
methods: {
  fetch(){
      req('getTableData', {
      }).then(data => {
        this.menuData = data.data
        let num1 = 0
        data.data.filter(item => {
          this.menuData[num1].label = item.goodsCateName
          this.menuData[num1].children = item.secondList
          
          let num2 = 0
          item.secondList.filter(item =>{
            this.menuData[num1].children[num2].label=item.goodsCateName
            num2=num2+1
          })
          num1 = num1 + 1
        })

      })
  },
   handleNodeClick (data) {
      this.tableSelectRows = data
      req('getuserData', {
        goodsCateCode: data.goodsCateCode
      }).then(data => {
        this.menuFormData = data.data
      })
      console.log(data)
      this.goodsCateCode1=data.goodsCateCode
      this.haha=1

  
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
            if(this.haha==0){
               req('addTableData',{
                 ...this.dialogFormData,
                 cateParentCode:0

      }).then(data =>{
          this.dialogVisible =false
          this.fetch()
                    this.$refs.dialogFormData.resetFields()
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.$refs.dialogFormData.resetFields()
          console.log(this.dialogVisible)
        }else{
          this.$message.error(data.msg)
        }
      })
            }else{
               req('addTableData',{
                 ...this.dialogFormData,
                 cateParentCode:this.goodsCateCode1

      }).then(data =>{
          this.dialogVisible =false
          this.fetch()
          this.haha=0
          console.log(this.haha)
                    this.$refs.dialogFormData.resetFields()
        if(data.code === '200'){
          this.$message.success(data.msg)
                    this.haha=0
          this.$refs.dialogFormData.resetFields()
          console.log(this.dialogVisible)
        }else{
          this.$message.error(data.msg)
        }
      })



            }
      
      
      }
      
      else {
            console.log('校验表单')
        req('changeTableData',{...this.dialogFormData,
      }).then(data =>{
        if(data.code === '200'){
          this.$message.success(data.msg)
          this.$refs.dialogFormData.resetFields()
          this.dialogVisible=false
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
    
}
}
</script>
<style scoped>
 .container{
     width: 90%;
     height: 80%;
     margin: 15px;
     display: flex;

 }
 .left{
     width: 40%;
     height: 100%;
      border: 1px solid #aaa;
 } .right{
     width: 60%;
     height: 100%;
      border: 1px solid #aaa;
 } 
 .left .top{
     border-bottom: 1px solid #aaa;
     padding: 10px;
 }
  .right .top{
      width: 70%;
     border-bottom: 1px solid #aaa;
     padding: 10px;
     height: 30px;
      border-right: 1px solid #aaa;
 }

</style>
