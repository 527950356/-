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
  addGoodsEvaluate:{
      url:'/app/order/addGoodsEvaluate',
      method:'post'
  },
  listGoodsForEvaluate:{
    url:'/app/order/listGoodsForEvaluate',
    method:'post'
},

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request