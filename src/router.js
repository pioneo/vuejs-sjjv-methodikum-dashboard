import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import { getAuth } from "firebase/auth";

import Login from "./views/Login";
import Home from "./views/Home";
import User from "./views/User";
import Welcome from "./views/Welcome";

import Firebase from "./modules/firebase/views/Firebase";
import FirestoreWelcome from "./modules/firebase/views/FirestoreWelcome"
import FirestoreQuery from "./modules/firebase/views/FirestoreQuery"
import FirestoreWrite from "./modules/firebase/views/FirestoreWrite"
import { store } from "./store.js"


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'welcome', name: 'Welcome', component: Welcome, meta: {
          requiresAuth: true
        },
      },
      {
        path: 'user', name: 'User', component: User, meta: {
          requiresAuth: true
        },
      },
      {
        path: '/firebase',
        name: 'Firebase',
        component: Firebase,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "welcome",
            name: "FirestoreWelcome",
            component: FirestoreWelcome,
            meta: {
              requiresAuth: true
            },
          },
          {
            path: 'query', name: 'FirestoreQuery', component: FirestoreQuery, meta: {
              requiresAuth: true
            },
          },
          {
            path: 'write', name: 'FirestoreWrite', component: FirestoreWrite, meta: {
              requiresAuth: true
            },
          },
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // anonymous is still authenticated, see store. If Login via an account use && getAuth().currentUser instead
  if (to.path === '/login' && store.getters.user) {//&& getAuth().currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !getAuth().currentUser) {
    next('/login')
    return;
  }
  next();
})

export default router