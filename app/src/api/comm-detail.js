import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  findGoods:{
      url:'/app/goods/findGoods',
      method:'post'
  },
  listGoodsEvaluates:{
    url:'/app/goods/listGoodsEvaluates',
    method:'post'
  },
  addShopCar:{
    url:'/app/shopCar/addShopCar',
    method:'post'
  },
  addOrder:{
    url:'/app/order/addOrder',
    method:'post'
  }

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request