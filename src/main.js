/**
 * @author Kerstin Neininger <kerstin.neininger@gmail.com>
 */

import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import { store } from "./store.js"

// Modal for dialogs
import AppModal from './plugins/modal.js'
Vue.use(AppModal)

// Firestore
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
})
.$mount('#app')
