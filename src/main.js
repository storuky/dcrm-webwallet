import Vue from "vue";
import store from "./store";
import router from "./router";
import web3 from "./lib/lilo";

import "typeface-open-sans";
import "normalize.css";
import "./assets/icons/style.css";
import "./assets/style.css";
import "./assets/table.css";
import "./assets/coin-icon.css";

import "./components";
import App from "./App.vue";

Vue.config.productionTip = false;

import VModal from "vue-js-modal";
Vue.use(VModal, { dynamic: true });

new Vue({
  store,
  router,
  web3,
  render: h => h(App)
}).$mount("#app");
