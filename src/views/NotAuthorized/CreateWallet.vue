<template>
  <div class="create-wallet">
    <vCard title="Create New Wallet">
      <hr>

      <form class="create-wallet__form">
        <vInput v-model="password" placeholder="Enter a password" type="password"/>
        <br>
        <div class="text-red">* Do NOT forget to save this!</div>
        <vBtn color="primary" class="next-step" v-if="password">Next step</vBtn>
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
export default {
  name: "CreateWallet",
  data() {
    return {
      password: null
    };
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
