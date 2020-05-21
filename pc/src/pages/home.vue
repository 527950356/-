<template>
  <el-container>

    <el-header height="70px">
      <router-link to="/">行走书店后台管理系统</router-link>

      <div class="user-info">
        <el-popover
        placement="top"
        v-model=" visible"
       >
        <el-button size="mini" type="text" @click="signOut">退出登陆</el-button>
            <div slot="reference">
        <img :src="admin.userImagePath" alt="">
        <span class="name">{{admin.userName}}</span>

      </div>
      </el-popover>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu @select="handlerSelect">
          <el-menu-item v-for="(item, index) in menuList" :index="item.menuPath" :key="index">
            <span slot="title">{{item.menuName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>



<script>

import req from '@/api/home.js'
export default {
  name: 'home',
  data () {
    return {
       visible: false,
      admin:{},
      menuList: [
        // {title: '用户管理', path: '/user-manage'},
        // {title: '菜单管理', path: '/menu-manage'},
        // {title: '商品管理', path: '/comm-manage'},
        // {title: '首页轮播图管理', path: '/home-pic-manage'},
        // {title: '商品分类管理', path: '/comm-classify-manage'},
        // {title: '客户管理', path: '/client-manage'},
        // {title: '订单管理', path: '/order-manage'},
        // {title: '热门位商品管理', path: '/hot-comm-manage'},
        // {title: '门店信息管理', path: '/shop-info-manage'},
        // {title: '司机信息管理', path: '/driver-info-manage'}
      ]
    }
  },
  methods: {
    handlerSelect (key, path) {
      if (key !== this.$route.path) {
        this.$router.replace({path: key})
      }
    },
    signOut(){
      sessionStorage.clear('userInfo')
      sessionStorage.clear('roleInfo')
      this.$router.push({path:'/register'})
    }
  },
  mounted(){
      req('getTop').
      then(data =>{
        this.admin=data.data
        console.log(this.admin)
        req('listMenu',{
         userRole:this.admin.role
      }
      ).then(data =>{
        this.menuList = data.data
      })
      })

  }
}
</script>

<style scoped lang="scss">
.el-header {
  background: rgb(242,242,242);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .router-link-active {
    font-size: 25px;
    color: #409EFF;
    text-decoration: none;
  }

  .user-info {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      margin-right: 25px;
      width: 50px;
      border-radius: 5px;
    }
    span{
      position: relative;
    }
    .name{
      position: relative;
      bottom: 13px;
    }
  }
}

.el-main {
  padding: 0;
}
</style>
