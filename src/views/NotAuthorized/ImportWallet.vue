<template>
  <div class="import-wallet">
    <vCard title="Import wallet">
      <hr>

      <div class="import-wallet__tabs-wrapper">
        <div class="import-wallet__tabs">
          <div
            v-for="tab in tabs"
            :key="tab.value"
            :class="['import-wallet__tab', {active: activeTab == tab.value}]"
            @click="activeTab = tab.value"
          >{{tab.title}}</div>
        </div>

        <div class="import-wallet__tabs-content">
          <div v-if="activeTab == 'keystore'">
            <Keystore/>
          </div>
          <div v-if="activeTab == 'private_key'">
            <PrivateKey/>
          </div>
        </div>
      </div>

      <div class="import-wallet__info">
        <p class="text-gray text-small text-center">
          Fusion DCRM Wallet does not hold your keys for you. We cannot access accounts, recover keys, reset passwords,
          nor reverse transactions. Protect your keys & always check that you are on correct URL. You are responsible for your security.
        </p>
      </div>
    </vCard>
  </div>
</template>

<script>
import Keystore from "./ImportWallet/Keystore";
import PrivateKey from "./ImportWallet/PrivateKey";

export default {
  name: "ImportWallet",
  components: {
    Keystore,
    PrivateKey
  },
  data() {
    return {
      activeTab: "keystore",
      password: null,
      passwordNeeded: null,
      wallet: null,
      walletJSON: null,
      tabs: [
        { value: "keystore", title: "Keystore / JSON File" },
        { value: "private_key", title: "Private Key" }
      ]
    };
  },
  methods: {}
};
</script>


<style scoped>
.import-wallet {
  max-width: 1280px;
  margin: auto;
}

.import-wallet__info {
  max-width: 900px;
  margin: 30px auto;
}

.import-wallet__tabs-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.import-wallet__tabs-content {
  flex: 1;
  padding: 0 30px;
}

.import-wallet__tabs {
  border-right: 2px solid #eee;
  width: 250px;
}

.import-wallet__tab {
  font-size: 16px;
  font-weight: 700;
  color: #666;
  line-height: 24px;
  white-space: nowrap;
  position: relative;
  padding-left: 25px;
  margin: 40px 0;
  cursor: pointer;
}

.import-wallet__tab.active {
  color: #2f7cd7;
}

.import-wallet__tab:before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #666;
  left: 0;
  top: 4px;
  border-radius: 12px;
}

.import-wallet__tab.active:before {
  border: 2px solid #2f7cd7;
  width: 4px;
  height: 4px;
  box-shadow: 0px 0px 0px 4px #2f7cd7;
  top: 8px;
  left: 4px;
}

.import-wallet__tabs-content {
  text-align: center;
  max-width: 500px;
  margin: auto;
}
</style>
