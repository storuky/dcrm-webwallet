module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8090,
    https: false,
    hotOnly: false,
    proxy: {
      "/api/*": {
        target: "https://api.dcrm.network",
        secure: false
      }
    }
  }
};
