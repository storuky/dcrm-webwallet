<template>
  <div>
    <div class="show-for-modal">
      <vTitle>Send Assets</vTitle>
    </div>
    <div class="transfer-send">
      <label class="label">{{symbol.toUpperCase()}} Send Address</label>
      <input type="text" v-model="address" class="input input-address">
      <br>
      <br>
      <label class="label">Amount</label>
      <input type="text" v-model="amount" class="input">

      <div class="send-actions">
        <vBtn color="primary" @click="send">Send</vBtn>
      </div>

      <div class="hide-for-modal">
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransferSend",
  props: {
    symbol: {
      type: String,
      default: "fsn"
    }
  },
  data() {
    return {
      address: "",
      amount: "0.00"
    };
  },
  methods: {
    send() {}
  }
};
</script>


<style scoped>
.transfer-send {
  padding: 25px;
}
.send-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.send-actions > * {
  min-width: 200px;
}
</style>
