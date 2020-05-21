<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="55px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
    </div>

    <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>

import axios from 'axios'
import req from '@/api/login.js'
const qs = require('qs')

export default {
  name: 'login',
  data () {
    return {
      formData: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
       login () {
      axios({
        method: 'post',
        url: 'http://qtgi5u1uor.52http.net/uaa/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        if (data.data.code === 0) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })

          sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
         this.getuser()
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg 
          })
        }
      })
  }, 
  getuser(){
    req('findUser').then(data =>{
       sessionStorage.setItem('roleInfo', JSON.stringify(data.data))

       console.log(data.data)
       if(data.data.role === '3'){
        this.$router.push({path: '/home'})
       }else if(data.data.role === '1'){
          this.$router.push({path: '/shop-order'})
       }else{
         this.$router.push({path: '/driver-info'})
       }
    })
  }
}
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}
</style>
