<template>
  <router-link :to="to" class="sidebar-item">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    to: {
      type: [String, Object],
      default: ""
    }
  }
};
</script>


<style scoped>
.sidebar-item {
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: white;
  border-left: 2px solid transparent;
  font-size: 16px;
  font-weight: lighter;
  cursor: pointer;
}

.sidebar-item > :global(*) {
  margin: 0 5px;
}

.sidebar-item.router-link-active {
  border-color: #fff;
  background: #00395f;
}

.sidebar-item:hover {
  background: #00395f;
}
</style>
