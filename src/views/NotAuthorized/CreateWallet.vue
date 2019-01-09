<template>
  <div class="create-wallet">
    <vCard title="Create New Wallet">
      <hr>

      <form class="create-wallet__form" @submit.stop.prevent="generateWallet">
        <vInput ref="input" v-model="password" placeholder="Enter a password" type="password"/>
        <br>
        <div class="text-red">* Do NOT forget to save this!</div>
        <vBtn color="primary" class="next-step" v-if="password.length>=9">Next step</vBtn>
      </form>

      <div class="create-wallet__info">
        <div class="text-center text-gray">
          <p>This password encrypts your private key. This does not act as a seed to generate your keys.
            <br>
            <strong>You will need this password + your private key to unlock your wallet.</strong>
          </p>
          <p class="text-small">
            Fusion DCRM Wallet does not hold your keys for you. We cannot access accounts, recover keys,
            reset passwords, nor reverse transactions. Protect your keys & always check that you are on correct URL. You are responsible for your security.
          </p>
        </div>
      </div>
    </vCard>
  </div>
</template>

<script>
import Wallet from "@/lib/wallet";
import { getBlob } from "@/lib/utils";

export default {
  name: "CreateWallet",
  data() {
    return {
      password: ""
    };
  },
  mounted() {
    const input = this.$refs.input.$el.querySelector("input");
    input.focus();
  },
  methods: {
    generateWallet() {
      const wallet = Wallet.generate(this.password);

      const walletJSON = wallet.toV3(this.password, {
        kdf: "scrypt",
        n: 8192
      });

      const filename = wallet.getV3Filename();
      const blob = getBlob({ str: walletJSON });

      this.$router.push({ name: "downloadWallet", params: { blob, filename } });
    }
  }
};
</script>

<style scoped>
.create-wallet {
  max-width: 1280px;
  margin: auto;
}

.create-wallet__form {
  max-width: 590px;
  margin: 70px auto;
  text-align: center;
}

.create-wallet__info {
  max-width: 900px;
  margin: auto;
}
</style>
