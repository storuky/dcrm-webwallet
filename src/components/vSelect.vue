<template>
  <div class="v-select">
    <div class="v-select__logo"></div>
    <div class="v-select__arrow"></div>
    <select class="v-select__control"></select>
  </div>
</template>

<style scoped>
.v-select {
  width: 390px;
  height: 40px;
  position: relative;
}

.v-select__control {
  width: 100%;
  height: 100%;
  border: 1px solid #004a7c;
  padding: 0 54px 0 42px;
  background: none;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
}
</style>
