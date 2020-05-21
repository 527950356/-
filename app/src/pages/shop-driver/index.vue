<template>
<div>
    <div class="container" v-for="item of drivers" :key="item.id">
       <div>
           <img src="../img/u1210.png" >
            {{item.userName}}
           </div>
       <div>
            <img src="../img/u1151.png">
            {{item.phone}}
           </div>



    </div>
    </div>


</template>
<script>
import req from '@/api/shop-driver.js'
export default {
    data(){
        return{
            drivers:{}
        }
    },
    mounted(){
        req('listManangerDriver').then(data =>{
           if(data.code ==='200'){
            this.drivers=data.data
           }
        })
    }
}
</script>

<style scoped lang="scss">
.container{
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
    div{
        padding: 10px;
    }
    img{
        position: relative;
    top: 5px;
    }

}
     
</style>