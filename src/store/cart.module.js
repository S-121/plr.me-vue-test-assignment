export const cart = {
  namespaced: true,
  state() {
    return {
      addedProducts: [],
    }
  },
  actions: {
    addProduct({ commit }, data) {
      commit('addProduct', data);
    }
  },
  mutations: {
    addProduct(state, data) {
      state.addedProducts.push(data);
    },
  }
};
