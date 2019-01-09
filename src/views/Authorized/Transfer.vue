<template>
  <div class="transfer">
    <vTitle>
      <div>Receive / Send</div>
      <div>
        <vSelect label="symbol" value="symbol" v-model="coin" :options="coins"></vSelect>
      </div>
    </vTitle>
    <div class="transfer__content">
      <vTabs :tabs="tabs" v-model="activeTab"></vTabs>
      <hr>

      <div class="transfer__tabs-content">
        <Receive :symbol="coin.symbol" v-if="activeTab == 0"/>
        <Send :symbol="coin.symbol" v-if="activeTab == 1"/>
      </div>
    </div>
  </div>
</template>

<script>
import Receive from "./Transfer/Receive";
import Send from "./Transfer/Send";

export default {
  name: "Transfer",
  components: {
    Receive,
    Send
  },
  data() {
    return {
      coin: "fsn",
      activeTab: 0,
      tabs: [{ name: "Receive" }, { name: "Send" }]
    };
  },
  computed: {
    coins() {
      return this.$store.getters["coins/all"];
    }
  }
};
</script>

<style scoped>
.transfer__content {
  padding: 15px 55px;
}
.transfer__tabs-content {
  margin-top: 30px;
}
</style>
