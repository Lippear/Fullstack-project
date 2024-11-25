export const calculateTotalItemsPrice = (cartItems) => {
  let totalPrice = 0

  Object.keys(cartItems).forEach((productId) => {
    const product = cartItems[productId]
    if (product && product.addedVolumes) {
      Object.keys(product.addedVolumes).forEach((volumeIndex) => {
        const count = product.addedVolumes[volumeIndex].count
        const price = product.volumesAndPrices[volumeIndex].price
        totalPrice += parseInt(price) * count
      })
    }
  })

  return totalPrice
}
