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
    url:'/pc/goodsCate/listGoodsCate',
    method:'post'
  },
  addTableData:{
    url:'/pc/goodsCate/addGoodsCate',
    method:'post'
  },
  changeTableData:{
    url:'/pc/goodsCate/updateGoodsCate',
    method:'post'
  },
  getuserData:{
    url:'/pc/goodsCate/findGoodsCate',
    method:'post'
  },
  deleteUser:{
    url:'/pc/goodsCate/deleteGoodsCate',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request