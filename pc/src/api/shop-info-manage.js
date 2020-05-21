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
    url:'/pc/store/listStore',
    method:'post'
  },
  addTableData:{
    url:'/pc/store/addStore',
    method:'post'
  },
  changeTableData:{
    url:'/pc/store/updateStore',
    method:'post'
  },
  getuserData:{
    url:'/pc/store/findStore',
    method:'post'
  },
  deleteUser:{
    url:'/pc/store/deleteStore',
    method:'post'
  },
  listArea:{
    url:'/pc/area/listArea',
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