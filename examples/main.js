import Vue from 'vue'
import App from './App.vue'
// import Form from '../packages/index.js'

Vue.config.productionTip = false

// Vue.use(Form)

new Vue({
  render: h => h(App),
}).$mount('#app')
