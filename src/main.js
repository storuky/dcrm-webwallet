import Vue from "vue";
import store from "./store";
import router from "./router";

import "typeface-open-sans";
import "normalize.css";
import "./assets/style.css";

import "./components";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
