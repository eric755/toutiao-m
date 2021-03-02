/**
 * 请求模块
 */
import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://toutiao-app.itheima.net/'// 接口基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'// 接口基础路径
})
// 请求拦截器

// 响应拦截器

export default request
