import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 一级路由组件渲染在APP
// 当转换路径时候再去请求页面，懒加载页面，优化首屏加载速度
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    // 二级路由当中如果没有/ 那么就是会和一级路由进行拼接 假设一级路由 /my 二级路由 home 那么就是/my/home
    // 二级路由当中如果有/ 那么就是不会和一级路由进行拼接
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
