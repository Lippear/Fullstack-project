import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  items: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
    },
    addItemToCart: (state, action) => {
      const id = action.payload
      state.items[id] = { count: 1 }
    },
    removeItemToCart: (state, action) => {
      const id = action.payload
      delete state.items[id]
    },
    clearCart: (state) => {
      state.items = {}
    },
  },
})

export const selectIsCartOpen = (state)=>state.cart.isOpen
export const selectCartItems=(state)=>state.cart.items

export const {
    openCart,
    closeCart,
    addItemToCart,
    removeItemToCart,
    clearCart
}=cartSlice.actions

export default cartSlice.reducer
