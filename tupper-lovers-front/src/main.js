import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMaterial from 'vue-material' //TODO: Cambiar por imports de lo necesario
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(window.firebase)