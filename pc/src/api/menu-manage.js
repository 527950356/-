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
  getmenu:{
    url:'/pc/menu/listMenuHome',
    method:'post'
  },
  changemenu:{
    url:'/pc/menu/updateMenu',
    method:'post'
  },
  getmenuData:{
    url:'/pc/menu/findMenu',
    method:'post'
  },
  addmenu:{
    url:'/pc/menu/addMenu',
    method:'post'
  },
  delete:{
    url:'/pc/menu/deleteMenu',
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