<template>
    <div class="container">
        <div class="login-form">
            <el-form :model="formData">
                 <div>请登陆</div>
                <el-form-item prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                 <el-form-item prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'register',
  data () {
    return {
      formData: {
        username: '',
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

          this.getHeader(data.data.data.access_token)
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    },
    getHeader(token){
      axios({
        method: 'post',
        url: 'http://qtgi5u1uor.52http.net/pc/top/getTop',
        data: qs.stringify({access_token:token}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        if (data.data.code === '200') {
          sessionStorage.setItem('roleInfo',JSON.stringify(data.data.data))
          if(data.data.data.role=== '1'){
           this.$router.push({path: '/client-manage'})
          }else if(data.data.data.role=== '0'){
            this.$router.push({path: '/home'})
          }else{
            
          }

        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url('../img/u0.jpg');
    background-repeat:no-repeat;
    background-size: 100% 100%;
    .el-form{
        width: 300px;
    height: 300px;
    position: absolute;
    right: 113px;
    top: 183px;
    background-color: rgba(255,255,255,0.5);
    text-align: center;
    color:#777
    

    }
   /deep/ .el-form  .el-form-item__content .el-input .el-input__inner{
              border-radius: 10px;
    width: 90%;
    height: 30px;
    margin-top: 20px;
  }
}
</style>