<template>
  <div class="v-coin">
    <div class="coin-icon" :class="[`coin-icon-${coin.symbol}`]"></div>
    <div class="v-coin__label">{{coin.name}}</div>
  </div>
</template>

<script>
export default {
  name: "vCoin",
  props: {
    coin: Object
  }
};
</script>

<style scoped>
.v-coin {
  display: inline-block;
  text-align: center;
  margin: 15px;
  width: 130px;
  padding: 10px;
}

.v-coin.active {
  background: #f7f7f7;
}

.v-coin__label {
  margin-top: 4px;
}
</style>
