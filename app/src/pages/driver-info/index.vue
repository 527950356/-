<template>
    <div class="container">
        <div  v-for="(item,index) in driver" :key="index">
        <div class="top">
            <div><img src="../img/u919.png">{{item.storeCode}}</div>
            <div>门店：{{item.storeName}}</div>
            <div>地址：{{item.address}}</div>
        </div>
         <div class="bottom">
             <div>店长：{{item.userName}}</div>
            <div>手机：{{item.phone}}</div>
         </div>
         </div>
    </div>
</template>
<script>
import req from '@/api/driver-info.js'
export default {
    data(){
        return{
            driver:{}
        }
    },
    mounted(){
        req('findDriverStore').then(data =>{
            this.driver=data.data
            console.log(this.driver)
        })
    }
}
</script>
<style scoped  lang="scss">
     .container{
         font-size: 15px;
     
        .top{
       border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        padding: 18px 33px;
        
        div:first-child{
             margin-bottom: 10px;
        }
        div{
            margin-bottom: 5px;
        }


    }
    .bottom{
         border-bottom: 1px solid #ddd;
         padding: 18px 33px;
            div{
            margin-bottom: 5px;
        }
    }
     }
</style>