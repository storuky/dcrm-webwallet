import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import modules from "./store/modules";
import router from "./router";

const store = new Vuex.Store({
  modules
});

store.watch(
  () => {
    return store.getters["wallet/wallet"];
  },
  wallet => {
    if (!wallet) {
      router.push("/");
    }
  }
);

export default store;
