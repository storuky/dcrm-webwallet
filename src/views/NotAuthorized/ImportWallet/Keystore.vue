<template>
  <div class="keystore">
    <h3>Select Your Wallet File</h3>
    <form @submit.stop.prevent="unlock">
      <label class="fileupload">
        <span>SELECT WALLET FILE...</span>
        <input class="hidden" type="file" @input="selectFile">
      </label>

      <vInput
        v-model="password"
        placeholder="Enter a password"
        type="password"
        v-if="passwordNeeded"
      />
      <div class="keystore__actions">
        <vBtn color="primary" v-if="password">Unlock</vBtn>
      </div>
    </form>
  </div>
</template>

<script>
import Wallet from "@/lib/wallet";

export default {
  name: "Keystore",
  data() {
    return {
      wallet: null,
      fileData: null,
      password: "",
      passwordNeeded: false
    };
  },
  methods: {
    selectFile(event) {
      const reader = new FileReader();

      const fileName = event.currentTarget.files[0].name;
      reader.onload = onLoadEvent => {
        this.fileData = onLoadEvent.currentTarget.result;
        this.passwordNeeded = Wallet.requirePass(this.fileData);
        this.password = "";
      };
      reader.readAsText(event.currentTarget.files[0]);
    },
    unlock() {
      const wallet = Wallet.getWalletFromPrivKeyFile(
        this.fileData,
        this.password
      );

      this.$store.dispatch("wallet/set", wallet);
      this.$router.push("dashboard");
    }
  }
};
</script>



<style scoped>
.keystore__actions {
  margin-top: 25px;
}

.fileupload {
  position: relative;
  text-align: center;
  line-height: 33px;
  background: #163a65;
  cursor: pointer;
  color: white;
  padding: 10px 50px;
  display: block;
  margin-bottom: 30px;
}

.fileupload:hover {
  filter: brightness(110%);
}
</style>
