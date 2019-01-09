import store from "@/store";

const checkAuth = router => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const wallet = store.getters["wallet/wallet"];
      if (wallet) {
        next();
      } else {
        next({
          name: "welcome"
        });
      }
    } else {
      store.dispatch("wallet/clear");
      next();
    }
  });
};

export default checkAuth;
