import Vue from 'vue'
import Router from 'vue-router'
import Personal from '@/components/Personal'
import Ability from '@/components/Ability'
import Write from '@/components/Write'
import Works from '@/components/Works'
import store from '@/store'

Vue.use(Router)

const routes = [
  {
    name: 'personal',
    path: '/personal',
    component: Personal
  },
  {
    name: 'ability',
    path: '/ability',
    component: Ability
  },
  {
    name: 'write',
    path: '/write',
    component: Write
  },
  {
    name: 'works',
    path: '/works',
    component: Works
  }
]

const route = new Router({
  routes: routes
})

route.afterEach((to) => {
  if (to.name === 'ability') {
    store.commit('setMainNavShow', false)
  } else {
    store.commit('setMainNavShow', true)
  }

  store.commit('setCurrentClass', to.name)

  const index = routes.findIndex((route) => {
    return route.path === to.path
  })

  if (to.path === '/' || index < 0) {
    store.commit('tabShadowShow', false)
    store.commit('tabActiveNav', -1)
  } else {
    store.commit('tabShadowShow', true)
    store.commit('tabActiveNav', index)
  }
})

export default route
