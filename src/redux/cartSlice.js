import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartTotalQuantity: 0,
    cartTotalPrice: 0,
    orderInfo: {
      shipping: 30000,
      discount: 0,
    },
    cartTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.products.push(tempProduct);
      }
    },
    decrementItem: (state, action) => {
      const indexItem = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (action.payload.quantity < 1) {
        alert("Ít nhất phải có một sản phẩm");
      } else {
        state.products[indexItem].quantity -= 1;
      }
    },
    showQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const indexItem = state.products.findIndex(
        (item) => item.id === product.id
      );
      state.products[indexItem].quantity = quantity;
    },
    removeItem: (state, action) => {
      const newCart = state.products.filter(
        (item) => item.id !== action.payload
      );

      if (state.products.length === 1) {
        return {
          ...state,
          products: newCart,
          cartTotalQuantity: 0,
          cartTotalPrice: 0,
          cartTotal: 0,
        };
      } else {
        return { ...state, products: newCart };
      }
    },

    incrementQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const itemIndex = state.products.findIndex(
        (item) => item.id === product.id
      );

      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += quantity;
      } else {
        const tempProduct = { ...action.payload, quantity };
        state.products.push(tempProduct);
      }
    },

    getTotal: (state) => {
      const totalItem = state.products.reduce((total, product) => {
        return total + product.quantity;
      }, 0);
      const totalPrice = state.products.reduce((total, product) => {
        return total + product.salePrice * product.quantity;
      }, 0);
      const total =
        totalPrice + state.orderInfo.shipping - state.orderInfo.discount;
      if (totalItem && totalPrice && total) {
        state.cartTotalQuantity = totalItem;
        state.cartTotalPrice = totalPrice;
        state.cartTotal = total;
      }
    },

    clearCart: (state) => {
      state.products = [];
      if (state.products.length === 0) {
        state.cartTotalQuantity = 0;
        state.cartTotalPrice = 0;
        state.cartTotal = 0;
      }
    },
  },
});

export const {
  addToCart,
  removeItem,
  decrementItem,
  showQuantity,
  getTotal,
  incrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
