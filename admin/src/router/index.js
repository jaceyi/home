import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Personal from '@/components/Personal'
import Ability from '@/components/Ability'
import Write from '@/components/Write'
import Works from '@/components/Works'

Vue.use(Router)

const childrenRoutes = [
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
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/',
      component: Index,
      redirect: '/personal',
      children: childrenRoutes
    }
  ]
})

export default router
