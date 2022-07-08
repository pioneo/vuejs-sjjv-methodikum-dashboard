import VueModal from '../views/Modal.vue'

const Modal = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('vue-modal', VueModal)
    Vue.prototype.$modal = {
      show(params) {
        Modal.EventBus.$emit('show', params)
      }
    }
  }
}
export default Modal