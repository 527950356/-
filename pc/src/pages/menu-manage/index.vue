<template>
    <div class="container">
    <div class="left">
        <div class="top">
         <el-button v-for="(item, index) in toolbar" :key="index" :type="item.type" @click="item.func">
        {{item.btnName}}
      </el-button>
        </div>
        <div class="bootom">
            <el-menu @select="handlerSelect">
          <el-menu-item v-for="(item, index) in menuList"  :key="index" :index="item.menuCode" @click="haha(item)">
            <span>{{item.menuName}}</span>
          </el-menu-item>
        </el-menu>
        </div>

    </div>
    <div class="right">
         <div class="top">
           菜单详情
         </div>
        <div class="bootom">
          <el-form label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单名称" prop="menuName">
               <el-input v-model="formData.menuName"></el-input>
               </el-form-item>
            </el-col>
                        <el-col :span="12">
              <el-form-item label="菜单路由" prop="menuPath">
               <el-input v-model="formData.menuPath"></el-input>
               </el-form-item>
            </el-col>
          </el-row>
                    <el-row>
            <el-col :span="12">
              <el-form-item label="路由编号" prop="menuCode">
               <el-input v-model="formData.menuCode"></el-input>
               </el-form-item>
            </el-col>
                        <el-col :span="12">
              <el-form-item label="备注" prop="menuRemark">
               <el-input v-model="formData.menuRemark"></el-input>
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
          <el-form-item label="名称" prop="menuName">
            <el-input v-model="dialogFormData.menuName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="路径" prop="menuPath">
            <el-input v-model="dialogFormData.menuPath"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
              <el-row>
        <el-col :span="12">
          <el-form-item label="备注" prop="menuRemark">
            <el-input v-model="dialogFormData.menuRemark"></el-input>
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

import req from '@/api/menu-manage.js'
export default {
      name: 'menu-manage',
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
      menuCode:[],
      menuCode2:'',
      role:' ',
      version:'',
      dialogTitle:'新增菜单',
            dialogTpye:'',
      dialogTitle:'',
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      options:[
        {label:'菜单',value:'0'},
         {label:'目录',value:'1'}
      ],
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func:()=>{
            this.dialogVisible=true
            console.log(this.dialogVisible)
            this.dialogVisible=true,
            this.dialogTpye='add'
            this.dialogTitle= '新增菜单'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
           func:()=>{
              if(this.menuCode.length ===0){
              this.$message.info('请选择需要修改的数据')
              return}
            req('changemenu',{
              ...this.formData,
              version:this.version
            }).then(data =>{
                this.$message.success(data.msg)
               this.fetch()
            })
          }
        },
        {
          btnName: '删除',
          type: 'primary',
           func:()=>{
                 if(this.menuCode.length ===0){
              this.$message.info('请选择需要删除的数据')
              return}
            this.$confirm('此操作将会永久删除的数据').then(() =>{
     req('delete',{
       menuCode:this.menuCode[0]
     }).then(data =>{
                    this.fetch()
       this.$message.success(data.msg)
       window.location.reload()
              })
              return
            })
          }
          
        },
                {
          btnName: '刷新',
          type: 'primary',
           func:()=>{

               req('getmenu',{
          role:this.role
      }).then(data =>{
        this.menuList = data.data
      })
        this.version = []
      this.menuList.forEach(item =>{
        this.version.push(item.version)
      })
          }
        },
      ],
      menuList: [
        
      ],
      rules:{
         menuName:[  { required: true, message: '请输入菜单名称', trigger: 'blur' },],
           menuPath:[  { required: true, message: '请输入菜单路径', trigger: 'blur' },],
      }
    }
    
},
methods:{
  haha(item){
    this.version=item.version
    this.menuCode2=item.menuCode
    console.log(item)
  },
      fetch(){
               req('getmenu',{
          role:this.role
      }).then(data =>{
        this.menuList = data.data
      })

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
               req('addmenu',{...this.dialogFormData,

      }).then(data =>{
                  this.fetch()
          this.dialogVisible =false
        if(data.code === '200'){
          this.fetch()
          window.location.reload()
          this.$message.success(data.msg)
          this.$refs.dialogFormData.resetFields()
          console.log(this.dialogVisible)
        }else{
          this.$message.error(data.msg)
        }
      })}
      
      else {
            console.log('校验表单')
        req('changemenu',{...this.dialogFormData,
      }).then(data =>{
                  this.fetch()
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
    handlerSelect(index){
        this.menuCode = []
        this.menuCode.push(index)
        

              req('getmenuData',{
        menuCode:index
      }).then(data =>{
          this.formData = Object.assign({},data.data)
      })

    }

},
mounted(){
  req('getTop',).then(data =>{
         this.role=data.data.role
   req('getmenu',{
          userRole:this.role
      }).then(data =>{
        this.menuList = data.data
      })
       })
       
       

}
}
</script>
<style scoped>
 .container{
     width: 90%;
     height: 100%;
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
