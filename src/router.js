import Vue from "vue";
import Router from "vue-router";
import checkAuth from "./router/checkAuth";

import routes from "./router/routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes
});

checkAuth(router);

export default router;
