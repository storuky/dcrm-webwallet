<template>
  <vLayout>
    <router-view/>
  </vLayout>
</template>

<script>
import vLayout from "./_shared/vLayout";

export default {
  name: "NotAuthorizedLayout",
  components: {
    vLayout
  }
};
</script>
