<template>
  <div>
    <div class="show-for-modal">
      <vTitle>Receive Assets</vTitle>
    </div>
    <div class="transfer-receive">
      <label class="label">{{symbol.toUpperCase()}} Receiving Address</label>
      <input type="text" v-model="address" disabled class="input input-address">

      <div class="receive-actions">
        <vBtn color="primary" @click="qrCode">
          <vIcon name="qr-code"/>
          <span>Show QR code</span>
        </vBtn>
        <vBtn color="primary-dark" @click="copy">
          <vIcon name="copy"/>
          <span>Copy clipboard</span>
        </vBtn>
      </div>

      <div class="hide-for-modal">
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClp } from "@/lib/utils";
import QrCode from "./QrCode";

export default {
  name: "TransferReceive",
  props: {
    symbol: {
      type: String,
      default: "fsn"
    }
  },
  computed: {
    address() {
      return this.$store.getters["wallet/address"] || "address";
    }
  },
  methods: {
    copy() {
      copyToClp(this.address);
    },
    qrCode() {
      this.$modal.show(
        QrCode,
        {
          address: this.address
        },
        { scrollable: true, height: "auto" }
      );
    }
  }
};
</script>


<style scoped>
.transfer-receive {
  padding: 25px;
}
.receive-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.receive-actions > * {
  margin: 0 10px;
}
</style>
