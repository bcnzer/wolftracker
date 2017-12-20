import Vue from 'vue'
import Router from 'vue-router'
import Wolves from '@/components/Wolves'
import UploadWolf from '@/components/UploadWolf'
import Callback from '@/components/Callback'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Wolves',
      component: Wolves
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/UploadWolf',
      name: 'Upload Wolf',
      component: UploadWolf
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
