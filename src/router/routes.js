import Welcome from "@/views/NotAuthorized/Welcome.vue";
import CreateWallet from "@/views/NotAuthorized/CreateWallet.vue";
import ImportWallet from "@/views/NotAuthorized/ImportWallet.vue";
import DownloadWallet from "@/views/NotAuthorized/DownloadWallet.vue";

import MyAssets from "@/views/Authorized/MyAssets.vue";
import Transfer from "@/views/Authorized/Transfer.vue";
import Lilo from "@/views/Authorized/Lilo.vue";
import DApp from "@/views/Authorized/DApp.vue";

const routes = [
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
  },
  {
    path: "/my-assets",
    name: "my-assets",
    component: MyAssets,
    meta: { requiresAuth: true }
  },
  {
    path: "/transfer",
    name: "transfer",
    component: Transfer,
    meta: { requiresAuth: true }
  },
  {
    path: "/lilo",
    name: "lilo",
    component: Lilo,
    meta: { requiresAuth: true }
  },
  {
    path: "/dapp",
    name: "dapp",
    component: DApp,
    meta: { requiresAuth: true }
  }
];

export default routes;
