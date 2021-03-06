/**
 * Created by wisdom on 2017/4/24.
 */

/**
 *  role 为权限设置 * 或者 ture 显示
 * index 为唯一标识,vuex state 存储
 */

let item1 = {
  name: 'app',
  text: '首页',
  index: '/app',
  icon: 'el-icon-location',
  display: true,
  dir: 'page/app',
  path: '/app',
  role: '*',
  child: []
}

let item2 = {
  name: 'client',
  text: '个人中心',
  index: '/test1',
  icon: 'el-icon-location',
  display: true,
  role: '*',
  child: [{
    name: 'app',
    text: '首页',
    index: '/app',
    icon: 'el-icon-location',
    display: true,
    dir: 'page/app',
    path: '/app',
    role: '*',
    child: []
  }, {
    dir: 'page/test1',
    name: 'test1',
    text: '我的问题',
    index: '/test2',
    icon: 'el-icon-location',
    path: '/test1',
    display: true,
    role: '*',
    child: [{
      dir: 'page/test1',
      name: 'test1',
      text: '问题列表',
      index: 'test1',
      icon: 'el-icon-location',
      role: '*',
      path: '/test1',
      display: true,
      child: []
    }, {
      dir: 'page/test2',
      name: 'test2',
      text: ' 问题日志',
      index: 'test2',
      icon: 'el-icon-location',
      role: '*',
      path: '/test2',
      display: true,
      child: []
    }]
  }, {
    dir: 'page/test3',
    name: 'test2',
    text: '我的文档',
    index: 'test3',
    icon: 'el-icon-location',
    path: '/test2',
    display: true,
    role: '*',
    child: [{
      dir: 'page/test3',
      name: 'test3',
      text: '文档列表',
      index: 'test3',
      icon: 'el-icon-location',
      role: '*',
      path: '/test3',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志',
      index: 'test4',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test5',
      text: ' 文档日志111',
      index: 'test5',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志222',
      index: 'test6',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志333',
      index: 'test7',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志444',
      index: 'test8',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志555',
      index: 'test9',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志666',
      index: 'test11',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志777',
      index: 'test12',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test13',
      text: ' 文档日志888',
      index: 'test13',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志999',
      index: 'test14',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }, {
      dir: 'page/test4',
      name: 'test4',
      text: ' 文档日志101010',
      index: 'test15',
      icon: 'el-icon-location',
      role: '*',
      path: '/test4',
      display: true,
      child: []
    }]
  }]
}

const menuRoot = [item1, item2]
export default menuRoot
