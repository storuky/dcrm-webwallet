const store = {
  namespaced: true,
  state: {
    all: [
      { symbol: "fsn", name: "Fusion" },
      { symbol: "btc", name: "Bitcoin" },
      { symbol: "eth", name: "Ethereum" },
      { symbol: "bnb", name: "Binance" },
      { symbol: "mkr", name: "Maker" },
      { symbol: "gusd", name: "Gemini Dollar" },
      { symbol: "ht", name: "HuobiToken" },
      { symbol: "bnt", name: "Bancor" }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    all(state) {
      return state.all;
    }
  }
};

export default store;
