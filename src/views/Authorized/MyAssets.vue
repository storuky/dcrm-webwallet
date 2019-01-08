<template>
  <div class="my-assets">
    <vTitle>
      <div>My Assets</div>
      <div>$ 0.00</div>
    </vTitle>

    <div class="my-assets__table">
      <div class="table-search">
        <input type="text" placeholder="FSN" v-model="query">
        <vIcon name="search"/>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="text-left">Coin</th>
            <th>Available Balance</th>
            <th>Freeze</th>
            <th>Total Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in coinsList" :key="coin.symbol">
            <td class="text-left">
              <div class="table-coin">
                <div class="table-coin-icon">
                  <div :class="`coin-icon coin-icon-${coin.symbol}`"></div>
                </div>
                <div class="table-coin-info">
                  <div class="table-coin-symbol">{{coin.symbol}}</div>
                  <div class="table-coin-name text-lighter">{{coin.name}}</div>
                </div>
              </div>
            </td>
            <td>0.00</td>
            <td>0.00</td>
            <td>
              <div>0.00</div>
              <div class="text-gray text-lighter">$ 0.00</div>
            </td>
            <td class="table-actions w0">
              <vBtn color="default-dark" border size="small">Receive</vBtn>
              <vBtn color="default-dark" border size="small">Send</vBtn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyAssets",
  data() {
    return {
      query: "",
      coins: [
        { symbol: "fsn", name: "Fusion" },
        { symbol: "btc", name: "Bitcoin" },
        { symbol: "eth", name: "Ethereum" },
        { symbol: "bnb", name: "Binance" },
        { symbol: "mkr", name: "Maker" },
        { symbol: "gusd", name: "Gemini Dollar" },
        { symbol: "ht", name: "HuobiToken" },
        { symbol: "bnt", name: "Bancor" }
      ]
    };
  },
  computed: {
    coinsList() {
      return this.coins.filter(coin => {
        return (
          coin.symbol.indexOf(this.query) != -1 ||
          coin.name.indexOf(this.query) != -1
        );
      });
    }
  }
};
</script>

<style>
.my-assets__table {
  padding: 20px 55px;
}
</style>
