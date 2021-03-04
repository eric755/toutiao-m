/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // baseURL: 'http://toutiao-app.itheima.net/'// 接口基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'// 接口基础路径
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起之后会经过这里
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没发出去）会进入这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
