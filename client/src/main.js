import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueResource from 'vue-resource'
// import { library } from '@fortawesome/fontawesome-svg-core' -> import library
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons' -> import icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faUserSecret) -> add icon
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
