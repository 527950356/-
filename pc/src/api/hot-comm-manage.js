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
    url:'/pc/hotGoods/listHotGoods',
    method:'post'
  },
  addTableData:{
    url:'/pc/hotGoods/addHotGoods',
    method:'post'
  },
  changeTableData:{
    url:'/pc/hotGoods/updateHotGoods',
    method:'post'
  },
  getuserData:{
    url:'/pc/hotGoods/findHotGoods',
    method:'post'
  },
  deleteUser:{
    url:'/pc/hotGoods/deleteHotGoods',
    method:'post'
  },
  getTop:{
    url:'/pc/top/getTop',
    method:'post'
  },
  findHotGoodsShowNum:{
    url:'/pc/hotGoods/findHotGoodsShowNum',
    method:'post'
  },
  updateHotGoodsShowNum:{
    url:'/pc/hotGoods/updateHotGoodsShowNum',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request