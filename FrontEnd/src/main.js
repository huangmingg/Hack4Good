import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';
import Routes from './routes.js';
import VueGoogleCharts from 'vue-google-charts';


Vue.use(VueGoogleCharts)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(vuetify)

Vue.config.productionTip = false

const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
});



new Vue({
  vuetify,
  render: h => h(App),
  router: myRouter,
}).$mount('#app')
