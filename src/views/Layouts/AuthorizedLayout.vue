<template>
  <vLayout>
    <vSidebar>
      <vSidebarItem to="/dashboard">
        <i class="sidebar-icon icon-my-assets"></i>
        <span>My Assets</span>
      </vSidebarItem>
      <vSidebarItem to="/transfer">
        <i class="sidebar-icon icon-transfer"></i>
        <span>Transfer</span>
      </vSidebarItem>
      <vSidebarItem to="/lilo">
        <i class="sidebar-icon icon-lilo"></i>
        <span>LILO</span>
      </vSidebarItem>
      <vSidebarItem to="dapp">
        <i class="sidebar-icon icon-dapp"></i>
        <span>DAPP</span>
      </vSidebarItem>
    </vSidebar>
    <div class="content-wrapper">
      <router-view/>
    </div>
  </vLayout>
</template>

<script>
import vLayout from "./_shared/vLayout";
import "@/components/AuthorizedLayout";

export default {
  name: "AuthorizedLayout",
  components: {
    vLayout
  }
};
</script>

<style scoped>
.content-wrapper {
  padding-left: 230px;
}

.sidebar-icon {
  height: 15px;
  width: 15px;
  background-repeat: no-repeat;
  background-size: contain;
}

.icon-my-assets {
  background-image: url("../../assets/image/my-assets.svg");
}

.icon-transfer {
  background-image: url("../../assets/image/transfer.svg");
}
.icon-lilo {
  background-image: url("../../assets/image/lilo.svg");
}
.icon-dapp {
  background-image: url("../../assets/image/dapp.svg");
}
</style>
