<template>
  <section class="v-content">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "vContent"
};
</script>

<style scoped>
.v-content {
  background: #eee;
  position: absolute;
  top: 92px;
  bottom: 65px;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: auto;
}
</style>

