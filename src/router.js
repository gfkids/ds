import Vue from 'vue'
import PageMain from './views/mainPage/PageMain.vue'
import store from "./store/store.js"
import VueRouter from 'vue-router'
import Contacts from './components/header/Contacts.vue'
import CreateProject from './views/projects/CreateProject.vue'
import PrivateProject from './views/projects/PrivateProject.vue'
import PrivateProjects from './views/projects/PrivateProjects.vue'
import UserPage from './views/projects/UserPage.vue'
import signup from './views/auth/signup.vue'
import signin from './views/auth/signin.vue'
import terms from './views/auth/terms.vue'
import NotFoundComponent from './views/mainPage/NotFoundComponent.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'PageMain',
    component: PageMain
  },
  { path: '/project/new',
    name: 'CreateProject',
    component: CreateProject,
    // component: () => import(/* webpackChunkName: "create", webpackPreFetch: true */ './views/projects/CreateProject.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters.userId !== null) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/private-projects',
    name: 'PrivateProjects',
    // component: () => import( webpackChunkName: "Private-Projects", webpackPreFetch: true  './views/projects/PrivateProjects.vue')
    component: PrivateProjects
  },
  { path: '/user-page',
    name: 'UserPage',
    // component: () => import( webpackChunkName: "UserPage", webpackPreFetch: true  './views/projects/UserPage.vue'),
    component: UserPage,
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/private-projects/:id',
    name: 'PrivateProject',
    component: PrivateProject,
    // component: () => import( webpackChunkName: "Private-Project", webpackPreFetch: true  './views/projects/PrivateProject.vue'),
    props: true
  },
  { path: '/signup',
    name: 'signup',
    // component: () => import( webpackChunkName: "signup", webpackPreFetch: true  './views/auth/signup.vue')
    component: signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: signin
    // component: () => import( webpackChunkName: "signin", webpackPreFetch: true  './views/auth/signin.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: terms
    // component: () => import( webpackChunkName: "signin", webpackPreFetch: true  './views/auth/terms.vue')
  },
  {
    path: '/*', component: NotFoundComponent
  }
]

const router = new VueRouter({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})


export default router

