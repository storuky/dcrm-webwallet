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


<style>
.icon-search {
  display: inline-block;
  height: 14px;
  width: 14px;
  background: url("../assets/image/search.png");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
