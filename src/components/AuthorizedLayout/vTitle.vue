<template>
  <div class="v-title">
    <slot></slot>
  </div>
</template>

<style scoped>
.v-title {
  width: 100%;
  height: 88px;
  background: #f0f9ff;
  padding: 0 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 36px;
  color: #004a7c;
  word-spacing: 8px;
}
</style>

<style>
.v--modal .v-title {
  padding: 0 25px;
}
</style>
