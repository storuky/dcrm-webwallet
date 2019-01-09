<template>
  <div class="welcome">
    <div class="welcome__actions">
      <vBtn color="primary" :to="{name: 'createWallet'}">
        <vIcon name="create-wallet-white"/>
        <span>Create Wallet</span>
      </vBtn>
      <vBtn :to="{name: 'importWallet'}">
        <vIcon name="import-wallet-blue"/>
        <span>Import Wallet</span>
      </vBtn>
    </div>

    <vCard title="Coins Supported">
      <div class="welcome__coins-container">
        <vCoinsSelect readonly :coins="coins"></vCoinsSelect>
      </div>
    </vCard>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  computed: {
    coins() {
      return this.$store.getters["coins/all"];
    }
  }
};
</script>

<style scoped>
.welcome {
  max-width: 970px;
  margin: auto;
  padding-top: 60px;
}

.welcome__actions {
  display: flex;
  justify-content: center;
}

.welcome__actions > * {
  margin: 0 25px;
  min-width: 200px;
}

.welcome__coins-container {
  max-width: 700px;
  margin: auto;
}
</style>
