import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
console.log(THREE, '=#@#@aaaaaa=')
// Vue.prototype.$three = THREE

// this.$three
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
