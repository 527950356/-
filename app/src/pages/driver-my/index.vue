<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img :src="user.userImagePath" >
        </div>
        <div class="text-con">{{user.userName}}</div>
    </div>
    <div class="content">
      <div class="top">
           <div>
           <img src="../img/u1210.png">
           {{user.driverName}}
           </div>
       <div>
            <img src="../img/u1151.png">
           {{user.phone}}</div>

      </div>
        <div
          class="con-item"
          v-for="(item,index) in conList"
          :key="index"
          @click="toPage(item)">
            <div>
                <img :src="item.img1" alt="">
            </div>
            <div><span>{{item.label}}</span></div>
            <div>
                <img :src="item.img2" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver-mine.js'
export default {
  name: 'mine',
  data () {
    return {
      user:{},
      conList: [ {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        },  {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ]
    }
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data.toPath})
    }
  },
  mounted(){
     req('findUser').then(data =>{
      this.user=data.data
    })
  }
}
</script>

<style lang="scss" scoped>
  .user {
      width: 100%;
      display: flex;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          img {
              width: 65px;
              height: 65px;
              position: relative;
              left: 38%;
          }
      }
      .text-con {
          flex: 2;
          line-height: 105px;
          font-size: 22px;
      }
  }
  .content {
      width: 100%;
      height: 125px;
      padding: 18px 0px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .top{
            margin-bottom: 8px;
    background: #ddd;
    padding: 7px 31px;
    font-size: 13px;
      }
      .con-item {
          width: 85%;
          flex: 1;
          padding: 0px 30px;
          display: flex;
          background: #ddd;
          margin-bottom: 10px;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
