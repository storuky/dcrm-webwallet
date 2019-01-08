const store = {
  namespaced: true,
  state: {
    wallet: null
  },
  mutations: {
    set(state, wallet) {
      state.wallet = wallet;
    }
  },
  actions: {
    set({ commit }, wallet) {
      commit("set", wallet);
    }
  },
  getters: {
    wallet(state) {
      return state.wallet;
    },
    address(state) {
      return state.wallet ? state.wallet.getChecksumAddressString() : null;
    },
    privateKey(state) {
      return state.wallet ? state.wallet.getPrivateKeyString() : null;
    }
  }
};

export default store;