import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'

const Canvas = () => import('@/components/Canvas')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Canvas',
      component: Canvas
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
