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
  getTableData:{
    url:'/pc/order/listOrder',
    method:'post'
  },
  changeTableData:{
    url:'/pc/order/updateOrderActive',
    method:'post'
  },
  findOrder:{
    url:'/pc/order/findOrder',
    method:'post'
  },
  updateOrderActive:{
    url:'/pc/order/updateOrderActive',
    method:'post'
  },
  getTop:{
    url:'/pc/top/getTop',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request