<template>
  <div class="v-tabs">
    <div
      :class="['v-tab', {active: index == value}]"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="setActive(index)"
    >{{tab.name}}</div>
  </div>
</template>

<script>
export default {
  name: "vTabs",
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setActive(index) {
      this.$emit("input", index);

      const handler = this.tabs[index].handler;
      if (handler) {
        handler();
      }
    }
  }
};
</script>

<style scoped>
.v-tab {
  min-width: 160px;
  height: 37px;
  border: 1px solid #3078d7;
  margin-right: 10px;
  font-size: 16px;
  color: #3078d7;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  cursor: pointer;
  position: relative;
}

.v-tab:not(.active):hover {
  background: #3078d714;
}

.v-tab.active {
  background: #3078d7;
  color: #fff;
}
.v-tab.active:before {
  display: block;
  content: "";
  width: 0;
  height: 0;
  display: block;
  border-top: 8px solid #3078d7;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  position: absolute;
  bottom: -8px;
  left: 50%;
  margin-left: -2px;
}
</style>

