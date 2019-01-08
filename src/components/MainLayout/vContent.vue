<template>
  <section class="v-content" :style="{background: background}">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "vContent",
  props: {
    background: {
      type: String,
      default: "#eee"
    }
  }
};
</script>

<style scoped>
.v-content {
  position: absolute;
  top: 92px;
  bottom: 65px;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: auto;
}
</style>

