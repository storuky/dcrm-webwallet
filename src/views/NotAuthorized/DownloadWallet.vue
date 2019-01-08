<template>
  <div class="download-wallet">
    <vCard title="Save your <span class='text-red text-bg-pink'>Keystore</span> File.">
      <hr>
      <div class="text-center download-wallet__info">
        <br>
        <br>
        <a :download="filename" :href="blob" target="_blank">
          <vBtn @click="download" color="primary">Download Keystore File (UTC / JSON)</vBtn>
        </a>
        <br>
        <br>
        <div>
          <p>
            <span class="text-red">* If you can't download, please disable AdBlock for this site.</span>
            <br>**Do not lose it!** It cannot be recovered if you lose it.
            <br>**Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.
            <br>**Make a backup!** Secure it like the millions of dollars it may one day be worth.
          </p>
        </div>
        <br>
        <br>
        <vBtn
          color="warn"
          :disabled="!downloaded"
          @click="$router.push('/')"
        >I understand. Continue.</vBtn>
        <br>
        <br>
        <div class="text-gray text-small">
          <p>Fusion DCRM Wallet does not hold your keys for you. We cannot access accounts, recover keys, reset passwords, nor reverse transactions. Protect your keys & always check that you are on correct URL. You are responsible for your security.</p>
        </div>
      </div>
    </vCard>
  </div>
</template>

<script>
export default {
  name: "DownloadWallet",
  created() {
    const { blob, filename } = this.$router.currentRoute.params;

    if (!blob || !filename) {
      this.$router.push("/");
      return;
    }

    this.blob = blob;
    this.filename = filename;
  },
  data() {
    return {
      blob: null,
      filename: null,
      downloaded: false
    };
  },
  methods: {
    download() {
      this.downloaded = true;
    }
  }
};
</script>


<style scoped>
.download-wallet {
  max-width: 1280px;
  margin: auto;
}
.download-wallet__info {
  max-width: 900px;
  margin: auto;
}
</style>
