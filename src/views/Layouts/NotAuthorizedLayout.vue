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
export default {
  name: "vLayout"
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
