import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/login',
    // name: 'login', // 如果父路由有默认子路由，那么它的 name 没有意义
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: '',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 路径为空表示默认这个页面为首页 默认子路由只能有一个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
