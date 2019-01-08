<template>
  <footer class="v-footer">
    <a class="v-footer__item v-footer__link" href="https://fusion.org" target="_blank">
      <vIcon name="logo-white" size="70"/>
    </a>

    <div class="v-footer__item">
      <a class="v-footer__link" href="https://github.com/FUSIONFoundation/dcrm-go" target="_blank">
        <vIcon name="git" size="18"/>
      </a>
      <a class="v-footer__link" href="https://gitter.im/FUSIONDC/" target="_blank">
        <vIcon name="git2" size="18"/>
      </a>
    </div>

    <div class="v-footer__item">{{year}} FUSION Foundation. All rights reserved.</div>
  </footer>
</template>

<script>
export default {
  name: "vFooter",
  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style scoped>
.v-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  z-index: 2;
}

.v-footer__item {
  margin: 0 15px;
  text-align: center;
}

.v-footer__link {
  margin: 0 5px;
}

.v-footer__link:hover {
  opacity: 0.8;
}
</style>

