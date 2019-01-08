<template>
  <div class="v-coins-select" :class="classes">
    <vCoin
      :class="{active: coin === value}"
      @click.native="setValue(coin)"
      v-for="coin in coins"
      :key="coin"
      :name="coin"
    ></vCoin>
  </div>
</template>

<script>
import vCoin from "./vCoin";

export default {
  name: "vCoinsSelect",
  components: {
    vCoin
  },
  props: {
    coins: {
      type: Array,
      deafult() {
        return [];
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selected: null
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.readonly) {
        classes.push("readonly");
      }

      return classes;
    }
  },
  methods: {
    setValue(coin) {
      this.$emit("input", coin);
    }
  }
};
</script>

<style scoped>
.v-coins-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.v-coins-select.readonly >>> .v-coin {
  cursor: default;
}

.v-coins-select:not(.readonly) >>> .v-coin {
  cursor: pointer;
}

.v-coins-select:not(.readonly) >>> .v-coin:hover {
  opacity: 0.8;
}
</style>
