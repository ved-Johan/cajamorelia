import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientTableView from '../views/ClientTable'
import ClientNewView from '../views/ClientNew'
import ClientView from '../views/ClientView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ClientTableView
  },
  {
    path: '/new',
    name: 'nuevo',
    component: ClientNewView
  },
  {
    path: '/:idCliente(\\d+)',
    name: 'cliente',
    component: ClientView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
