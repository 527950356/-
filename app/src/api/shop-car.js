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
  listShopCar:{
      url:'/app/shopCar/listShopCar',
      method:'post'
  },
  deleteShopCar:{
    url:'/app/shopCar/deleteShopCar',
    method:'post'
  },
  addOrder:{
    url:'/app/order/addOrder',
    method:'post'
},
updateShopCar:{
  url:'/app/shopCar/updateShopCar',
  method:'post'
},
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request