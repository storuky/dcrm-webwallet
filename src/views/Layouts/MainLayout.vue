<template>
  <div class="main-layout">
    <vHeader></vHeader>
    <vContent>
      <router-view/>
    </vContent>
    <vFooter></vFooter>
  </div>
</template>

<script>
import vHeader from "./MainLayout/vHeader";
import vFooter from "./MainLayout/vFooter";
import vContent from "./MainLayout/vContent";

export default {
  name: "MainLayout",
  components: {
    vHeader,
    vFooter,
    vContent
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
</style>
