<template>
  <div class="qr-code">
    <h2>QR Code</h2>
    <div id="qrcode"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "QrCode",
  props: {
    address: String
  },
  mounted() {
    new QRCode("qrcode", {
      width: 300,
      height: 300,
      text: this.address
    });
  }
};
</script>

<style scoped>
.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}
</style>
