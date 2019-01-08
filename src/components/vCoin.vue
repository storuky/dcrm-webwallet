<template>
  <div class="v-coin">
    <div class="v-coin__icon" :class="[`v-coin__icon-${name}`]"></div>
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

.v-coin__icon {
  width: 65px;
  height: 65px;
  display: inline-block;
}

.v-coin.active {
  background: #f7f7f7;
}

.v-coin__label {
  margin-top: 4px;
}

.v-coin__icon-btc {
  background-image: url("../assets/image/btc.svg");
}

.v-coin__icon-eth {
  background-image: url("../assets/image/eth.svg");
}

.v-coin__icon-fsn {
  background-image: url("../assets/image/fsn.svg");
}

.v-coin__icon-bnb {
  background-image: url("../assets/image/bnb.svg");
}

.v-coin__icon-mkr {
  background-image: url("../assets/image/mkr.svg");
}

.v-coin__icon-gusd {
  background-image: url("../assets/image/gusd.svg");
}

.v-coin__icon-ht {
  background-image: url("../assets/image/ht.svg");
}

.v-coin__icon-bnt {
  background-image: url("../assets/image/bnt.svg");
}
</style>
