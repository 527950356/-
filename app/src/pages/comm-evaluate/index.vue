<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="{active:this.orderTye ==1}" @click="click1">全部评价</span>
      <span :class="{active:this.orderTye ==2}" @click="click2">好评</span>
      <span :class="{active:this.orderTye ==3}" @click="click3">中评</span>
      <span :class="{active:this.orderTye ==4}" @click="click4">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userAccount}}</div>
              <div class="date">{{item.goodsEvaluateTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.goodsEvaluateScore*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.goodsEvaluateContent}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'
export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: [
      ],
      goodsData:{},
            orderTye:1
    }
  },
   mounted(){
            this.goodsData =JSON.parse(sessionStorage.getItem('goodsinfo'))
       req('listGoodsEvaluates',{
         goodsCode:this. goodsData.goodsCode
       }).then(data =>{
          this.list=data.data
       })
   },
   methods:{
      click1(){
  req('listGoodsEvaluates',{

         goodsCode:this. goodsData.goodsCode
       }).then(data =>{
          this.list=data.data
                   this.orderTye=1
      })
        },
                click2(){
  req('listGoodsEvaluates',{
    goodsEvaluateScore:5,
         goodsCode:this. goodsData.goodsCode
       }).then(data =>{
          this.list=data.data
                   this.orderTye=2
      })
        },
                click3(){                  
 req('listGoodsEvaluates',{
       goodsEvaluateScore:3,
         goodsCode:this. goodsData.goodsCode
       }).then(data =>{
          this.list=data.data
                   this.orderTye=3
      })
        },
                click4(){
 req('listGoodsEvaluates',{
       goodsEvaluateScore:1,
         goodsCode:this. goodsData.goodsCode
       }).then(data =>{
          this.list=data.data
                   this.orderTye=4
      })
        },
   }
}
</script>

<style lang="scss" scoped>
.container {
 background: rgb(238, 236, 236);
 height: 100%;


  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;

    li {
      display: flex;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: #ddd;
              font-size: 14px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
