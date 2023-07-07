import ProductService from '../services/product.service';

export const product = {
  namespaced: true,
  state() {
    return {
      products: [],
      filterProdcuts: [],
      categoryNames: []
    }
  },
  actions: {
    async getProduct({ commit }) {
      await ProductService.getProduct().then(
        (response) => {
          var categoryNames = [];
          for (var i = 0; i < response.data.products.length; i++) {
            categoryNames[i] = response.data.products[i].category;
          }
          categoryNames = categoryNames.filter((item, index) => categoryNames.indexOf(item) === index);

          commit('getCategoryNames', categoryNames);
          commit('getAllProducts', response.data.products);
        },
        (error) => {
          commit('getAllProducts', (error.response && error.response.data && error.response.data.message) || error.message || error.toString());
        }
      );
    },
    selectedCategory({ commit, state }, category) {
      if (category == "all") {
        commit('selectedCategory', state.filterProdcuts);
        return;
      }
      commit('selectedCategory', state.filterProdcuts.filter(product => product.category == category));
    }
  },
  mutations: {
    getAllProducts(state, products) {
      state.products = products;
      state.filterProdcuts = products;
    },
    getCategoryNames(state, data) {
      state.categoryNames = data;
    },
    selectedCategory(state, data) {
      state.products = data;
    },
  }
};
