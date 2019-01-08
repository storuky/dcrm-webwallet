import Vue from "vue";
import store from "./store";
import router from "./router";
import web3 from "./lib/lilo";

import "typeface-open-sans";
import "normalize.css";
import "./assets/style.css";

import "./components";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  web3,
  render: h => h(App)
}).$mount("#app");
