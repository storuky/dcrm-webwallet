<template>
  <div class="header-actions">
    <div class="header-action" @click="copy">
      <span>{{collapsedAddress}}</span>
      <vIcon name="copy2"/>
    </div>
    <div class="header-action-split"></div>
    <div class="header-action">
      <vIcon name="setting2"/>
    </div>
    <div class="header-action">
      <vIcon name="help"/>
    </div>
    <div class="header-action">
      <vIcon name="refresh"/>
    </div>
    <div class="header-action" @click="clearSession">
      <vIcon name="quit"/>
    </div>
  </div>
</template>

<script>
import { copyToClp } from "@/lib/utils";

export default {
  name: "HeaderActions",
  computed: {
    address() {
      const address = this.$store.getters["wallet/address"];
      return address || "longaddressline";
    },
    collapsedAddress() {
      const before = this.address.slice(0, 6);
      const after = this.address.slice(
        this.address.length - 4,
        this.address.length
      );
      return `${before}..${after}`;
    }
  },
  methods: {
    copy() {
      copyToClp(this.address);
    },
    clearSession() {
      this.$store.dispatch("wallet/clear");
      this.$router.push("/");
    }
  }
};
</script>



<style scoped>
.header-actions {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-action {
  color: #392d6d;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  cursor: pointer;
}
.header-action > :global(*) {
  margin: 0 5px;
}

.header-action:hover {
  opacity: 0.8;
}

.header-action-split {
  height: 15px;
  width: 1px;
  background: #392d6d;
  margin: 0 15px;
}
</style>
