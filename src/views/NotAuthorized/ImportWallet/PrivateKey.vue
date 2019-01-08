<template>
  <div class="pk">
    <h3>Paste Your Private Key</h3>
    <form class="form" @submit.stop.prevent="unlock">
      <vInput v-model="privateKey" placeholder="Enter a Private Key" type="password"/>

      <div class="pk__actions">
        <vBtn color="primary" v-if="privateKey">Unlock</vBtn>
      </div>
    </form>
  </div>
</template>

<script>
import Wallet from "@/lib/wallet";

export default {
  name: "PrivateKey",
  data() {
    return {
      privateKey: null
    };
  },
  methods: {
    unlock() {
      const wallet = new Wallet(
        new Buffer(this.fixPkey(this.privateKey), "hex")
      );

      this.$store.dispatch("wallet/set", wallet);

      this.$router.push("dashboard");
    },
    fixPkey(key) {
      if (key.indexOf("0x") === 0) {
        return key.slice(2);
      }
      return key;
    }
  }
};
</script>

<style scoped>
.pk__actions {
  margin-top: 25px;
}
</style>
