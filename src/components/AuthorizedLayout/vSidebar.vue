<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<style scoped>
.sidebar {
  width: 230px;
  background: #004a7c;
  position: fixed;
  left: 0;
  top: 92px;
  bottom: 65px;
  padding-top: 32px;
}
</style>
