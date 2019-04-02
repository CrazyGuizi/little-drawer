import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/news',
          name: 'News',
          component: () => import('./views/News.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/video',
          name: 'Video',
          component: () => import('./views/Video.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/picture',
          name: 'Picture',
          component: () => import('./views/Picture.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/novel',
          name: 'Novel',
          component: () => import('./views/Novel.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/person',
          name: 'Person',
          component: () => import('./views/Person.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/newsDetail',
          name: 'NewsDetail',
          component: () => import('./views/NewsDetail.vue')
        },
        {
          path: '/videoDetail',
          name: 'VideoDetail',
          component: () => import('./views/VideoDetail.vue')
        }
      ]
    },

  ]
})
