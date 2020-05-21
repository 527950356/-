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
    url:'/pc/rotate/listRotate',
    method:'post'
  },
  addTableData:{
    url:'/pc/rotate/addRotate',
    method:'post'
  },
  changeTableData:{
    url:'/pc/rotate/updateRotate',
    method:'post'
  },
  getuserData:{
    url:'/pc/rotate/listGoods',
    method:'post'
  },
  deleteUser:{
    url:'/pc/rotate/deleteRotate',
    method:'post'
  },
  listGoods:{
    url:'/pc/rotate/listGoods',
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