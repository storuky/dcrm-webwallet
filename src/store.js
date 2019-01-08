import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import modules from "./store/modules";

export default new Vuex.Store({
  modules
});
