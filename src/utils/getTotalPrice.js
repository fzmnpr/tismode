export const postDeliveryPrice = 25000
export const getDeliveryPrice = (deliveryMethod) => {
  if (deliveryMethod === 'post') {
    return postDeliveryPrice
  }
  return 0
}
