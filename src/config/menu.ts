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
  index: '1',
  icon: 'home',
  display: true,
  dir: 'page/app',
  path: '/app',
  role: '*',
  child: [],
  meta: {
    requiresAuth: true,
    role: '*'
  }
}

const menusd = [item1]
export default menusd
