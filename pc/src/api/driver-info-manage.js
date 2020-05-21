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
    url:'/pc/driver/listDriver',
    method:'post'
  },
  addTableData:{
    url:'/pc/driver/addDriver',
    method:'post'
  },
  changeTableData:{
    url:'/pc/driver/updateDriver',
    method:'post'
  },
  getuserData:{
    url:'/pc/driver/findDriver',
    method:'post'
  },
  deleteUser:{
    url:'/pc/driver/deleteDriver',
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