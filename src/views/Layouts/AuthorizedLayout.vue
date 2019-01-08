<template>
  <div class="main-layout">
    <vHeader>
      <template slot="left">
        <HeaderActions/>
      </template>
    </vHeader>
    <vContent background="white">
      <Sidebar/>
      <div class="content-wrapper">
        <router-view/>
      </div>
    </vContent>
    <vFooter></vFooter>
  </div>
</template>

<script>
import "@/components/AuthorizedLayout";
import Sidebar from "./AuthorizedLayout/Sidebar";
import HeaderActions from "./AuthorizedLayout/HeaderActions";

export default {
  name: "AuthorizedLayout",
  components: {
    Sidebar,
    HeaderActions
  }
};
</script>

<style scoped>
.main-layout {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.content-wrapper {
  padding-left: 230px;
}
</style>
