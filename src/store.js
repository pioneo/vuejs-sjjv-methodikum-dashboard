import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { FirebaseStore } from "./modules/firebase/store"
export const store = new Vuex.Store({
  modules: {
    FirebaseStore,
  }
});