import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  items: {}
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
      const { item, choosenItemIndex } = action.payload
      const { id, brand, name, photo, volumesAndPrices } = item
      const product = state.items[id]

      if (!product) {
        state.items[id] = {
          brand,
          name,
          photo,
          volumesAndPrices,
          addedVolumes: {
            [choosenItemIndex]: {
              count: 1
            }
          }
        }
      } else {
        if (!product.addedVolumes[choosenItemIndex]) {
          product.addedVolumes[choosenItemIndex] = {
            count: 1
          }
        }
      }
    },
    removeItemFromCart: (state, action) => {
      const { id, volumeIndex } = action.payload

      const product = state.items[id]
      if (product && product.addedVolumes[volumeIndex]) {
        delete product.addedVolumes[volumeIndex]
        if (Object.keys(product.addedVolumes).length === 0) {
          delete state.items[id]
        }
      } else {
        console.error('Продукт или объём не найден!')
      }
    },
    setItemCount: (state, action) => {
      const { id, volumeIndex, selectedCount } = action.payload
      const product = state.items[id]
      console.log(typeof(selectedCount))
      if (product && product.addedVolumes[volumeIndex]) {
        product.addedVolumes[volumeIndex] = {
          count: selectedCount
        }
      }
    },
    clearCart: (state) => {
      state.items = {}
    }
  }
})

export const selectIsItemInCart = (state, id, volumeIndex) => {
  const product = state.cart.items[id]
  return product && product.addedVolumes && product.addedVolumes[volumeIndex] ? true : false
}

export const selectUniqueItemsCount = (state) => {
  const items = state.cart.items
  let uniqueItemsCount = 0

  Object.keys(items).forEach((productId) => {
    const product = items[productId]

    Object.keys(product.addedVolumes).forEach(() => {
      uniqueItemsCount += 1
    })
  })

  return uniqueItemsCount
}

export const selectIsCartOpen = (state) => state.cart.isOpen
export const selectCartItems = (state) => state.cart.items

export const { openCart, closeCart, addItemToCart, removeItemFromCart, setItemCount, clearCart } = cartSlice.actions
export default cartSlice.reducer
