<template>
  <div class="welcome">
    <div class="welcome-actions">
      <vBtn color="primary" :to="{name: 'createWallet'}">
        <i class="create-wallet-icon"></i>
        <span>Create Wallet</span>
      </vBtn>
      <vBtn :to="{name: 'importWallet'}">
        <i class="import-wallet-icon"></i>
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
  data() {
    return {
      coins: ["btc", "eth", "fsn", "bnb", "mkr", "gusd", "ht", "bnt"]
    };
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

.create-wallet-icon,
.import-wallet-icon {
  height: 14px;
  width: 15px;
  background-size: contain;
  background-repeat: no-repeat;
}

.create-wallet-icon {
  background-image: url("../../assets/image/create-wallet-white.svg");
}

.import-wallet-icon {
  background-image: url("../../assets/image/import-wallet-blue.svg");
}
</style>
