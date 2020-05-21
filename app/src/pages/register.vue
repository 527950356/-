<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="80px" :rules="rules" ref="formData" :label-position="labelPosition">
      <el-form-item label="头像" prop="userProfile">
         <i-file v-model="formData.userProfile"></i-file>
      </el-form-item>
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="formData.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input type="password" v-model="formData.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="userPassword2">
        <el-input type="password" v-model="formData.userPassword2"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model.number="formData.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item prop="userSex" label="性别" style="">
        <el-radio-group v-model="formData.userSex" >
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="userIdCard">
        <el-input v-model="formData.userIdCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="formData.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="inviteCode">
        <el-input v-model="formData.inviteCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="register">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/register.js'
import IFile from '@/components/common/i-file.vue'
const qs = require('qs')
export default {
  
  name: 'register',
  components: {
     IFile
  },
  data () {
    return {
      labelPosition:'right',
      formData: {},
       rules: {
          userAccount:[  { required: true, message: '用户账号', trigger: 'blur' },],
           userName:[  { required: true, message: '用户姓名', trigger: 'blur' },],
           userSex:[  { required: true, message: '用户性别', trigger: 'change' },],
             userPhone:[  { required: true, message: '手机号', trigger: 'blur' },
             {type:'number',message:'电话号码必须为数字'}],
               userIdCard:[  { required: true, message: '身份证', trigger: 'blur' },],
                userPassword:[  { required: true, message: '用户密码', trigger: 'blur' ,},],
                  userPassword2:[  { validator: this.validatePass2,required: true,  trigger: 'change' ,},],
         }
    }
  },
  methods:{
    // register(){
    //   req('clientRegister',{
    //       ...this.formData
    //   }).then(data =>{
    //     console.log(this.formData)
    //      this.$message.success(data.msg)
    //      if(data.data.code ==='200'){
    //      this.$router.push({path: '/login'})
    //      }
    //   })
    // }
  
   register() {
      axios({
        method: 'post',
        url: 'http://qtgi5u1uor.52http.net/app/register/clientRegister',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        if (data.data.code === '200') {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
        this.$router.push({path: '/login'})
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg 
          })
        }
      })
   },
   validatePass2(rule, value, callback){
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.userPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
  }, 
  
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    height: 55px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
      .el-form-item__label{
      width: 80px;
    }
    .el-form-item__label:nth-child(6){
      position: relative;
    right: 48px;
    }
    
  }
   /deep/.el-form-item is-required{
     .el-form-item__label{
      width: 80px;
    }
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}

</style>
