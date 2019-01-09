<template>
  <div class="welcome">
    <div class="welcome-actions">
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
      <vCoinsSelect readonly :coins="coins"></vCoinsSelect>
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

.welcome-actions {
  display: flex;
  justify-content: center;
}

.welcome-actions > * {
  margin: 0 25px;
  min-width: 200px;
}
</style>
