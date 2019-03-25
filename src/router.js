import Vue from 'vue'
import Router from 'vue-router'
import News from './views/News.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'news',
      component: News
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./views/Video.vue')
    },
    {
      path: '/picture',
      name: 'picture',
      component: () => import('./views/Picture.vue')
    },
    {
      path: '/novel',
      name: 'novel',
      component: () => import('./views/Novel.vue')
    },
    {
      path: '/person',
      name: 'person',
      component: () => import('./views/Person.vue')
    }
  ]
})
