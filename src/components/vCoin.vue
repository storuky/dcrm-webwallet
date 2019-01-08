<template>
  <div class="v-coin">
    <div class="v-coin__icon" :class="[`coin-icon-${name}`]"></div>
    <div class="v-coin__label">{{label}}</div>
  </div>
</template>

<script>
export default {
  name: "vCoin",
  props: {
    name: String
  },
  data() {
    return {
      labels: {
        btc: "Bitcoin (BTC)",
        eth: "Ethereum (ETH)",
        fsn: "FUSION (FSN)",
        bnb: "Binance (BNB)",
        mkr: "Maker (MKR)",
        gusd: "Gemini Dollar (GUSD)",
        ht: "HuobiToken (HT)",
        bnt: "Bancor (BNT)"
      }
    };
  },
  computed: {
    label() {
      return this.labels[this.name];
    }
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
