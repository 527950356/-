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
  listOrder:{
      url:'/app/order/listOrder',
      method:'post'
  },
  updateOrderActive:{
    url:'/app/order/updateOrderActive',
    method:'post'
},
deleteOrder:{
  url:'/app/order/deleteOrder',
  method:'post'
},


}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request