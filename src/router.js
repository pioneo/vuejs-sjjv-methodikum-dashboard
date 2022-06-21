import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from "./views/Home";
import FirestoreWelcome from "./modules/firebase/components/FirestoreWelcome"
import FirestoreQuery from "./modules/firebase/components/FirestoreQuery"
import FirestoreWrite from "./modules/firebase/components/FirestoreWrite"

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home', name: 'Home', component: Home,
      children: [
        {
          path: "/firestore/welcome",
          name: "FirestoreWelcome",
          component: FirestoreWelcome
        },
        { path: '/firestore/query', name: 'FirestoreQuery', component: FirestoreQuery },
        { path: '/firestore/write', name: 'FirestoreWrite', component: FirestoreWrite },
      ]
    },
  ]
})

export default router