<template>
  <div class="main-layout">
    <vHeader></vHeader>
    <vContent>
      <slot></slot>
    </vContent>
    <vFooter></vFooter>
  </div>
</template>

<script>
import vHeader from "./vHeader";
import vFooter from "./vFooter";
import vContent from "./vContent";

export default {
  name: "vLayout",
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
