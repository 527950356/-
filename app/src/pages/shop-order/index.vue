<template>
  <div>
    <div class="leader">
         <ul>
            <li :class="{active:this.orderTye ==1}" @click="click1">全部订单</li>
            <li  :class="{active:this.orderTye ==2}" @click="click2">已付款</li>
            <li :class="{active:this.orderTye ==3}" @click="click3">待取货</li>
            <li :class="{active:this.orderTye ==4}" @click="click4">已完成</li>
        </ul>
    </div>
    <div class="order-item" v-for="item of list" :key="item.id">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>{{item.orderActive ==='0'?'已下单':
                item.orderActive ==="1"?'已取消':
                item.orderActive ==="2"?'已到货':
                item.orderActive ==="3"?'已取货':
                item.orderActive ==="4"?'已完成未评价':'已完成已评价'}}</span>
        </div>
        <div class="item-center" v-for="item of item.orderDetailList" :key="item.id" @click="toPage(item)">
            <div class="img-con" >
                <img :src="item.goodsImagePath" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{item.goodsIntroduce}}
                </div>
                <div class="props-con">
                    {{item.prop}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{item.goodsPrice}} &nbsp;</span>
                    <span>x{{item.goodsCount}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{item.pucharNum}}件商品，合计￥</span>
            <span>{{item.sumPrice}}</span>
        </div>

             <el-button round class="change" v-show="item.orderActive == '0'" @click="change(item)">
                <span>已到货</span></el-button>
                        <!-- <el-button round class="change" v-show="item.orderActive == '3'" @click="change2(item)"><span>已完成</span></el-button> -->
        <div class="item-more" v-show="item.orderStatus == '已完成'">
            <div class="btn" @click.stop="evaluate(item)">
                <span>评价</span>
            </div>
        </div>
    </div>

        <div class="order-item" v-for="item of list2" :key="item.id" v-show="orderTye=='4'">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>{{item.orderActive ==='0'?'已下单':
                item.orderActive ==="1"?'已取消':
                item.orderActive ==="2"?'已到货':
                item.orderActive ==="3"?'已取货':
                item.orderActive ==="4"?'已完成未评价':'已完成已评价'}}</span>
        </div>
        <div class="item-center" v-for="item of item.orderDetailList" :key="item.id" @click="toPage(item)">
            <div class="img-con" >
                <img :src="item.goodsImagePath" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{item.goodsIntroduce}}
                </div>
                <div class="props-con">
                    {{item.prop}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{item.goodsPrice}} &nbsp;</span>
                    <span>x{{item.goodsCount}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{item.pucharNum}}件商品，合计￥</span>
            <span>{{item.sumPrice}}</span>
        </div>

             <el-button round class="change" v-show="item.orderActive == '0'" @click="change(item)">
                <span>已发货</span></el-button>
                        <!-- <el-button round class="change" v-show="item.orderActive == '3'" @click="change2(item)"><span>已完成</span></el-button> -->
        <div class="item-more" v-show="item.orderStatus == '已完成'">
            <div class="btn" @click.stop="evaluate(item)">
                <span>评价</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-order.js'
export default {
  name: 'order-list',
  data () {
    return {
      list: [
        // {
        //   id: '001',
        //   orderNum: '2020020713270034',
        //   orderStatus: '已付款',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }, 
        // {
        //   id: '002',
        //   orderNum: '2020020713270034',
        //   orderStatus: '已完成',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }
      ],
      list0:[],
      list2:[],
        orderTye:1
    }
  },
  methods: {
	    toPage (data) {
            sessionStorage.setItem('orderCode',JSON.stringify(data))
			this.$router.push({path: '/order-detail'})
		},
		evaluate (data) {
			console.log(data)
			this.$router.push({path: '/order-evaluate'})
        },
          change(data){
            req('updateManangerOrderState',{
                orderCode:data.orderCode,
                orderActive:2,
                version:data.version
            }).then(data =>{
              req('listManagerOrders',{
                   orderActive:0
              }).then(data =>{
         if(data.code ==='200'){
                               this.list=data.data.list
                  this.orderTye=2
                  }else{
                               this.list=this.list2
                  this.orderTye=2
                  }

      })
            })
        },  change2(data){
            req('updateManangerOrderState',{
                orderCode:data.orderCode,
                orderActive:4,
                version:data.version
            }).then(data =>{
                 req('listManagerOrders').then(data =>{
         this.list=data.data
      })
            })
        },
         click1(){
              req('listManagerOrders').then(data =>{
         this.list=data.data
         console.log(data.data)
         this.orderTye=1
      })
        },
                click2(){
              req('listManagerOrders',{
                   orderActive:0
              }).then(data =>{
         this.list=data.data
                  this.orderTye=2
      })
        },
                click3(){
                    
              req('listManagerOrders',{
                  orderActive:2
              }).then(data =>{
            if(data.code ==='200'){
                    this.list=data.data
                  }else{
                      this.list=this.list0
                  }
                  this.orderTye=3
      })
        },
                click4(){
              req('listManagerOrders',{
                  orderActive:4
              }).then(data =>{
                  console.log(data.code )
                  if(data.code ==='200'){
                    this.list=data.data
                  }else{
                      this.list=this.list0
                  }
                  this.orderTye=4
      })
                    req('listManagerOrders',{
                  orderActive:5
              }).then(data =>{
                  console.log(data.code )
                  if(data.code ==='200'){
                    this.list2=data.data
                  }else{
                      this.list=this.list0
                  }
                  this.orderTye=4
      })
        },
  },
  mounted(){
       req('listManagerOrders').then(data =>{
            if(data.code ==='200'){
         this.list=data.data
            }
      })
  }
}
</script>

<style lang="scss" scoped>
  .leader {
      height: 64px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          .img-con {
              flex: 1;
              text-align: center;
              img {
                  width: 84px;
              }
          }
          .text {
              flex: 2.2;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 13.5px;
                  line-height: 26px;
                  color: rgb(168,168,168);
              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(2) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 11px;
                      color: rgb(168,168,168);
                  }
              }
          }
      }
      .item-bottom {
          width: 100%;
          line-height: 40px;
          text-align: right;
          padding-top: 5px;
          span:nth-child(1) {
              font-size: 15px;
          }
          span:nth-child(2) {
              font-size: 20px;
          }
      }
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -16px;
                  color: rgb(195,152,98);
              }
          }
      }
      .change{
          border: 2px solid #C79F6C;
          height: 33px;
              position: relative;
    left: 243px;
    width: 95px;
    height: 31px;

          span{
              position: relative;
              bottom: 13px;
              color: #C79F6C;
              right: 3px;
          }
      }
  }
</style>
