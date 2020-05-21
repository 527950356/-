<template>
  <div class="container">
    <div class="banner-pic-list" >
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in picList" :key="index" @click.native="haha(item)">
          <img :src="item.goodsImagePath" alt="" >
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.goodsImagePath" alt="">
        <div class="book-info">{{item.goodsName}}</div>
        <div>￥{{item.goodsPrice}}</div>
      </li>
    </ul>
  </div>
</template>

<script>

import req from '@/api/comm-home.js'
export default {
  name: 'comm-home',
  data () {
    return {
      picList: [
      ],
      commList: [
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // }
      ]
    }
  },
  methods: {
    haha(data){
      this.$router.push({path: '/comm-detail'})
        sessionStorage.setItem('goodsinfo',JSON.stringify(data))
    },
    toDetailPage (data) {
      this.$router.push({path: '/comm-detail'})
        sessionStorage.setItem('goodsinfo',JSON.stringify(data))
    }
  },
  mounted(){
    req('listRotate').then(data =>{
      this.picList =data.data
    })
    req('listHotGoods').then(data =>{
      this.commList= data.data
    })
    
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(238, 236, 236);
}
.banner-pic-list{
  background: #fff;
}

.el-carousel {
  .el-carousel__container {
    background: #fff;
    .el-carousel__item {
      img {
        width: 60%;
        height: 100%;
        position: absolute;
        left: 22%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: rgb(238, 236, 236);
  margin-top: 10px;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;

  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto 10px;
    border-radius: 10px;

    img {
      width: 100%;
    }

    div:nth-child(2) {
      font-size: 12px;
      padding-left: 10px;
    }

    div:nth-child(3) {
      font-size: 12px;
      text-align: center;
      margin-top: 10px;
      color: red;
    }
  }
}
</style>
