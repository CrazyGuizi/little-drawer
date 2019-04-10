import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Person from './views/person/Person.vue'
import Layout from './components/person/Layout.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect:'/news',
      component: Home,
      meta: {
        title:'主页'
      },
      hidden: true,
      children:[
        {
          path: '/news',
          name: 'News',
          component: () => import('./views/news/News.vue'),
          meta: {
            title:'新闻',
            icon:'news',
            keepAlive: true
          }
        },
        {
          path: '/video',
          name: 'Video',
          component: () => import('./views/video/Video.vue'),
          meta: {
            title:'视频',
            keepAlive: true
          }
        },
        {
          path: '/picture',
          name: 'Picture',
          component: () => import('./views/picture/Picture.vue'),
          meta: {
            title:'图片',
            keepAlive: true
          }
        },
        {
          path: '/novel',
          name: 'Novel',
          component: () => import('./views/novel/Novel.vue'),
          meta: {
            title:'小说',
            keepAlive: true
          }
        },
        {
          path: '/newsDetail',
          name: 'NewsDetail',
          component: () => import('./views/news/NewsDetail.vue'),
          meta:{
            title:'新闻详情'
          }
        },
        {
          path: '/videoDetail',
          name: 'VideoDetail',
          component: () => import('./views/video/VideoDetail.vue'),
          meta: {
            title: '视频详情'
          }
        }
      ]
    },
    {
      path: '/404',
      name:'404',
      component: () => import('./views/404.vue'),
      hidden:true
    },
    {
      path:'*',
      redirect: '/404',
      meta: {
        title:'页面找不到'
      },
      hidden:true
    },
    {
      path: '/person',
      name: 'Person',
      redirect: '/person/index',
      component: Layout,
      children: [
        {
          path:'index',
          component: () => import('./views/person/Index.vue'),
          meta: {
            title: '欢迎',
          },
        }
      ],
      hidden:true
    },
    {
      path:'/adminMe',
      name: 'AdminMe',
      component: Layout,
      meta: {
        title: '个人',
      },
      children:[
        {
          path: 'center',
          name: "PersonCenter",
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'changeMessage',
          name: "ChangeMessage",
          meta: {
            title: '信息修改'
          }
        },
        {
          path: 'superAdmin',
          name: "SuperAdmin",
          meta: {
            title: '超级管理员'
          }
        }
      ]
    },
    {
      path:'/adminNews',
      name: 'AdminNews',
      component: Layout,
      meta: {
        title: '新闻'
      },
      children:[
        {
          path: 'articles',
          name: "Article",
          component: () => import('@/views/person/news/Article.vue'),
          meta: {
            title: '文章管理'
          }
        },
        {
          path: 'newsComments',
          name: "NewsComments",
          component: () => import('@/views/person/news/Comment.vue'),
          meta: {
            title: '评论管理'
          }
        },
        {
          path: 'publishNews',
          name: "PublishNews",
          meta: {
            title: '发表新闻'
          }
        }
      ]
    },
    {
      path:'/adminVideo',
      name: 'AdminVideo',
      component: Layout,
      meta: {
        title: '视频'
      },
      children:[
        {
          path: 'myVideo',
          name: "MyVideo",
          component: () => import('@/views/person/video/MyVideo.vue'),
          meta: {
            title: '我的视频'
          }
        },
        {
          path: 'videoComments',
          name: "VideoComments",
          component: () => import('@/views/person/video/Comment.vue'),
          meta: {
            title: '评论管理'
          }
        },
        {
          path: 'publishVideo',
          name: "PublishVideo",
          meta: {
            title: '上传视频'
          }
        }
      ]
    },
    {
      path:'/adminPicture',
      name: 'AdminPicture',
      component: Layout,
      meta: {
        title: '图片'
      },
      children:[
        {
          path: 'myPicture',
          name: "MyPicture",
          component: () => import('@/views/person/picture/MyPicture.vue'),
          meta: {
            title: '我的图片'
          }
        },
        {
          path: 'publishPicture',
          name: "PublishPicture",
          meta: {
            title: '上传图片'
          }
        }
      ]
    },
    {
      path: '/adminCollection',
      name: "AdminCollection",
      component: Layout,
      meta: {
        title: '收藏'
      },
      children:[
        {
          path:'myCollection',
          name:'MyCollection',
          component: () => import('@/views/person/collection/MyCollection.vue'),
          meta: {
            title: '我的收藏'
          }
        }
      ]
    },
  ]
})
