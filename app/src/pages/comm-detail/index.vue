<template>
<div>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData.goodsImagePath" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price">￥{{commDetailData.goodsPrice}}</div>
      <!-- <div class="book-name">{{commDetailData.goodsName}}</div> -->
      <div class="book-Describe">{{commDetailData.goodsIntroduce}}</div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
                  <div
              class="star"
              :style="{backgroundPosition: `${90 - commDetailData.goodsEvaluateScore*18}px 0`}">
            </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{address}}</span>
      </div>
    </div>
  </div>
          <div class="footer">
            <div class="z" @click="gotoshopcar">
        <label>购物车</label>
        <div class="gwc"></div>
        </div>
        <div class="x" @click="addshopcar">
        <img src="../img/按钮3.png" >
        <label> 加入购物车</label>
        </div>
          <div class="c" @click="addorder">
         <label>立即购买</label>
        <img src="../img/按钮2.png">
          </div>
    </div>
</div>
  
</template>

<script>
import req from '@/api/comm-detail.js'
export default {
  name: 'comm-detail',
  data () {
    return {
      shopinfo:{},
      goodsData:{
      },
      commDetailData: {
        // goodsName: '三国演义',
        // isbn: '',
        // goodsDescribe: '《三国演义是中国古典四大名著之一，亦是中国第一部长篇历史章回小说，作者一般被认为是元末明初的罗贯中。',
        // goodsPrice: '100',
        // goodsImagePath: '',
        // goodsEvaluateScore: '1',
        // goodsAuthor: '罗挂钟',
        // goodsPress: '666'
      },
      bookCount: 1,
      address: '新华书店（新街口店）'
    }
  },
  methods: {
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    countAdd () {
      this.bookCount++
    },
    addshopcar(){
                this.$confirm('该商品将会加入购物车').then(() =>{
                  req('addShopCar',{
       goodsCode:this.goodsData.goodsCode,
       goodsCount:this.bookCount
     }).then(data =>{
       if(data.code =='200'){        this.$message.success(data.msg)}
       else{
         this.$message.error(data.msg)
       }

        console.log(this.goodsData)
     })
    })
    },
    addorder(){
        this.$confirm('确定购买').then(() =>{
                  req('addOrder',{
       goodsCodeList:this.goodsData.goodsCode,
       goodsCountList:this.bookCount,
       goodsPriceList:this.goodsData.goodsPrice,
          storeCode:this.shopinfo.data.storeCode,
     }).then(data =>{
       if(data.code ==='200'){
                 this.$message.success(data.msg)
       }
          else{
             this.$message.error(data.msg)
          }
     })
    })
    },
    gotoshopcar(){
      this.$router.push({path: '/shop-car'})
    }
    
  },
  mounted(){
            this.shopinfo =JSON.parse(sessionStorage.getItem('shopinfo'))
       this.goodsData =JSON.parse(sessionStorage.getItem('goodsinfo'))
       req('findGoods',{
         goodsCode:this.goodsData.goodsCode
       }).then(data =>{
          this.commDetailData=data.data
       })
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.book-banner {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  margin: 10px auto 0;
 .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
  .book-price {
    font-size: 22px;
    color: red;
  }

  // .book-name {
  //   font-size: 18px;
  //   line-height: 30px;
  // }

  .book-Describe {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .handler-box {
      display: flex;
      height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }

  .address {
    margin-top: 10px;

    .iconhtmal5icon14 {
      color: #ddd;
    }
  }

  
}
.footer {
     position: fixed;
    display: flex;
    height: 50px;
    width: 100%;
    background: #ffffff;
    justify-content:flex-end;
    bottom: 0px;
    align-items: center;
     border-top: 1px solid #000;

   img{
    width: 100px;
    height: 35px;
    margin-left: 11px;
}
    div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
.gwc{
    width: 25px ;
    height: 25px ;
    margin-right: 10px;
    margin-bottom: 12px;
    background: url('../img/购物车2.png') no-repeat 0 0;
    background-size: 26px;
}
  label{
    position:absolute;
  }
  .z{
    label{
      top: 29px;
      font-size: 14px;
    }
  }
  .x{
     label{
      right: 125px;
      font-size: 14px;
    }
  }
    .c{
     label{
      right: 20px;
      font-size: 14px;
    }
  }

}
</style>

