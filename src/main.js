import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'

import { router } from './routes'

Vue.use(Vuetify)


Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')




