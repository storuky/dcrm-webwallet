<template>
  <i :class="'icon-'+name" :style="{fontSize: size+'px'}"></i>
</template>

<script>
export default {
  name: "vIcon",
  props: {
    size: {
      type: [Number, String],
      default: 16
    },
    name: String
  }
};
</script>
