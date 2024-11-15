import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './redux-toolkit/cart/cartSlise'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})


export default store