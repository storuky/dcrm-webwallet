<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<style scoped>
.sidebar {
  width: 230px;
  background: #004a7c;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding-top: 32px;
}
</style>
