<template>
  <div id="app">
    <AuthorizedLayout v-if="!wallet"/>
    <NotAuthorizedLayout v-else/>
  </div>
</template>

<script>
import AuthorizedLayout from "./views/Layouts/AuthorizedLayout";
import NotAuthorizedLayout from "./views/Layouts/NotAuthorizedLayout";

export default {
  name: "App",
  components: {
    AuthorizedLayout,
    NotAuthorizedLayout
  },
  computed: {
    wallet() {
      return this.$store.getters["wallet/wallet"];
    }
  }
};
</script>
