import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      // if there is a cart saved in a file then we load that cart
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'));
      }
      // if not we create a new file to store the cart
      else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    addToCart(state, item) {
      console.log('addToCart');
      // we search for the item id in our cart to see if it already exists
      const exists = state.cart.items.filter(i => i.product.id === item.product.id);
      // if it exists we don't add the item to the cart, we just change its quantity
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity);
      }
      // if the item doesn't exist then we add it to the current cart
      else {
        state.cart.items.push(item);
      }
      // we update the local file with our cart
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
  },
  modules: {
  }
})
