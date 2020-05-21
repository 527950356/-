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
    url:'/pc/goods/listGoods',
    method:'post'
  },
  addTableData:{
    url:'/pc/goods/addGoods',
    method:'post'
  },
  changeTableData:{
    url:'/pc/goods/updateGoods',
    method:'post'
  },
  getuserData:{
    url:'/pc/goods/findGoods',
    method:'post'
  },
  deleteUser:{
    url:'/pc/goods/deleteGoods',
    method:'post'
  },
  listGoodsCate:{
    url:'/pc/goods/listGoodsCate',
    method:'post'
  },
  updateGoodsActive:{
    url:'/pc/goods/updateGoodsActive',
    method:'post'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request