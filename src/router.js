import Vue from "vue";
import Router from "vue-router";
import Welcome from "./views/NotAuthorized/Welcome.vue";
import CreateWallet from "./views/NotAuthorized/CreateWallet.vue";
import ImportWallet from "./views/NotAuthorized/ImportWallet.vue";
import DownloadWallet from "./views/NotAuthorized/DownloadWallet.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome
    },
    {
      path: "/new-wallet",
      name: "createWallet",
      component: CreateWallet
    },
    {
      path: "/import-wallet",
      name: "importWallet",
      component: ImportWallet
    },
    {
      path: "/download-wallet",
      name: "downloadWallet",
      component: DownloadWallet
    }
  ]
});
