import {
  createStore
} from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    cart: [],
    user: [],
  },

  mutations: {
    SET_LOGIN_STATE(state, value) {
      state.isLoggedIn = value;
    },

    addToCart(state, product) {

      let item = state.cart.find(item => item._id === product._id);

      if (item) {
        item.quantity++;
        console.log(`Sản phẩm ${item.title} đã có trong giỏ hàng. Số lượng hiện tại là ${item.quantity}.`);
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        });
        console.log(`Sản phẩm ${product.title} đã được thêm vào giỏ hàng.`);

      }

    },
    decreaseQuantity(state, product) {
      let item = state.cart.find(item => item._id === product._id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    increaseQuantity(state, product) {
      let item = state.cart.find(item => item._id === product._id);
      if (item) {
        item.quantity++;
      }
    },
    removeFromCart(state, product) {
      state.cart = state.cart.filter(item => item._id !== product._id);
    },

    addUser(state, account) {
      state.user.push({
        ...account
      });
      console.log(`Nguoi dung ${user.name} đã được thêm vao store.`);

    },

  },

}, );