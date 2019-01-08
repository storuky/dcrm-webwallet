<template>
  <div class="v-card">
    <div class="v-card__title" v-if="title">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vCard",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.v-card {
  min-height: 200px;
  background: #fff;
  margin: 60px auto;
  padding: 40px;
}

.v-card__title {
  font-size: 30px;
  line-height: 52px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
