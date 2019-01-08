<template>
  <header class="v-header">
    <div class="v-header__left">
      <router-link to="/" class="v-header__logo">
        <img width="100%" src="@/assets/image/logo.svg">
      </router-link>
    </div>
    <div class="v-header__right"></div>
  </header>
</template>

<script>
export default {
  name: "vHeader"
};
</script>

<style scoped>
.v-header {
  width: 100%;
  height: 92px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 0 5%;
  background: #fff;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-header__logo {
  width: 350px;
  display: block;
}

.v-header__logo img {
  display: block;
}
</style>

