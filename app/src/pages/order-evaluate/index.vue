<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.goodsImagePath" alt="">

        <div class="star">
          <el-rate v-model="item.evaluateScore"></el-rate>
        </div>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input v-model="item.evaluateContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div>

    <el-button class="submit-btn" type="primary" @click="addEvaluate">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/order-evaluate.js'
import axios from 'axios'
// const qs = require('qs')

export default {
  name: 'order-evaluate',
  data () {
    return {
      evaluateList: []
    }
  },
  mounted () {
this.orderCode =JSON.parse(sessionStorage.getItem('orderCode'))
    console.log(this.$route.query)
    this.getEvaluate()
  },
  methods: {
    getEvaluate () {
      req('listGoodsForEvaluate', {orderCode: this.orderCode.orderCode}).then(data => {
        console.log(data)
        this.evaluateList = data.data
      })
    },
    addEvaluate () {
      let evaluateLists = this.evaluateList.map(item => {
            return Object.assign({}, {goodsCode: item.goodsCode, evaluateContent: item.evaluateContent, evaluateScore: item.evaluateScore})
      })
      console.log(evaluateLists)
      //   req('addGoodsEvaluate',{
        
      //   orderCode:this.orderCode.orderCode,
      //   list:this.evaluateLists
        
      //    }).then(data => {
        
      // })
       axios({
        method: 'post',
        url:  'http://qtgi5u1uor.52http.net/app/order/addGoodsEvaluate',
        data:{
          orderCode:this.orderCode.orderCode,
          list:evaluateLists
        },
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
        }
      }).then(data => {
            this.$router.push({path: '/order-list'})
            this.$message.success(data.msg)
      })
    
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    // height: 200px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;

    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 150px;
        height: 150px;
      }

      .star {
        width: 180px;
        height: 36px;
        position: relative;
        left: -20px;
        // background: url('../../assets/stars.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;

        /deep/ .el-rate__item {
          .el-rate__icon {
            font-size: 25px;
          }
        }
      }
    }

    .eva-box {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
    }
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
