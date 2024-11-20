// services/calculateTotalCartPrice.js
export const calculateTotalCartPrice = (cartItems) => {
  let totalPrice = 0

  Object.keys(cartItems).forEach((productId) => {
    const product = cartItems[productId]
    if (product && product.addedVolumes) {
      Object.keys(product.addedVolumes).forEach((volumeIndex) => {
        const volume = product.addedVolumes[volumeIndex]
        totalPrice += volume.price * volume.count
      })
    }
  })

  return totalPrice
}
