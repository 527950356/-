<template>
  <div>
    <div class="pwd-con">
      <el-form :model="formData" inline label-width="94px" :rules="rules" ref="formData">
      <el-form-item label="原密码" class="pwd-item" prop="userPassword">
            <input type="password" placeholder="请输入原密码" v-model="formData.userPassword">
      </el-form-item>
      <el-form-item label="新密码" class="pwd-item" prop="userNewPassword">
            <input type="password" placeholder="请输入新密码" v-model="formData.userNewPassword">
      </el-form-item>
      <el-form-item label="确认新密码" class="pwd-item" prop="userNewPassword2">
            <input type="password" placeholder="请输入确认新密码" v-model="formData.userNewPassword2">
      </el-form-item>
      </el-form>
    </div>
    <div class="btn" @click="change">
        <img src="../../assets/按钮.png">
        <span>确认</span>
    </div>
    
  </div>
</template>

<script>
import req from '@/api/change-password.js'
export default {
  name: 'change-password',
  data () {
     var validatePass2 = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.userPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      formData:{},
      version:{},
       rules: {
               userPassword:[  { required: true, message: '用户原密码', trigger: 'blur' ,},],
                userNewPassword:[  { required: true, message: '用户新密码', trigger: 'blur' ,},],
                  userNewPassword2:[  { validator: validatePass2,required: true, message: '确认用户新密码', trigger: 'blur' ,},],
         }
    }
  },
  methods:{
  change(){
    req('updateUserPassword',{
       userPassword:this.formData.userPassword,
       userNewPassword:this.formData.userNewPassword,
       version:this.version.data.version
    }).then(data =>{
      console.log(data.code)
      if(data.code ==='200'){
         this.$message.success(data.msg)
         this.$router.push({path: '/login'})
      }else{
          this.$message.error(data.msg)
      }
    })
  }
  },
  mounted(){
     this.version =JSON.parse(sessionStorage.getItem('shopinfo'))
  }
}
</script>

<style lang="scss" scoped>
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
