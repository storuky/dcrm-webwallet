<template>
  <div class="lilo">
    <vTitle>
      <div>Lockin / Lockout</div>
    </vTitle>
    <div class="lilo-container">
      <vCoinsSelect @input="select" v-model="selected" :coins="coins"></vCoinsSelect>
    </div>
  </div>
</template>

<script>
import ImportWallet from "../NotAuthorized/ImportWallet";

export default {
  name: "Lilo",
  data() {
    return {
      selected: null
    };
  },
  computed: {
    coins() {
      return this.$store.getters["coins/all"];
    }
  },
  methods: {
    select() {
      this.$modal.show(ImportWallet, {}, { scrollable: true, height: "auto" });
    }
  }
};
</script>

<style scoped>
.lilo-container {
  /* max-width: 700px; */
}
</style>
