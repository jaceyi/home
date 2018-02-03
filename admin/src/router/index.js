import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Personal from '@/components/Personal'
import Ability from '@/components/Ability'
import Write from '@/components/Write'
import Works from '@/components/Works'
import store from '@/store'

Vue.use(Router)

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index
  },
  {
    name: 'Personal',
    path: '/personal',
    component: Personal
  },
  {
    name: 'Ability',
    path: '/ability',
    component: Ability
  },
  {
    name: 'Write',
    path: '/write',
    component: Write
  },
  {
    name: 'Works',
    path: '/works',
    component: Works
  }
]

const router = new Router({
  routes: routes
})

router.afterEach((to) => {
  const index = routes.findIndex((route) => {
    return route.path === to.path
  })
  store.commit('tabNavActive', index)
})

export default router
