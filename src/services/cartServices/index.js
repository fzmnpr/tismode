import { request } from 'utils/customAxiosInterceptor'

export const addCartToServer = async (product, user) => {
  const data = {
    product: product?.product_variant ? product?.product_variant : product?.id,
    user: user.id,
    variant: product?.product_variant ? product?.id : null,
    quantity: product?.cartAmount || 1,
  }
  try {
    const response = await request.post('CartItem', data)
    if (response.data.success) {
      return response.data.success
    }
  } catch (err) {
    return err
  }
}
const getCartItems = async () => request.get('CartItem')
export const updateCartInServer = async (user, product, type) => {
  let data = {
    product: product?.product_variant ? product.product_variant : product.id,
    user: user.id,
    variant: product?.product_variant ? product.id : null,
  }
  if (type === 'delete') {
    data = {
      ...data,
      quantity: 0,
    }
  } else if (type === 'update') {
    data = {
      ...data,
      quantity: 1,
    }
  }
  try {
    const cartItem = await getCartItems()
    if (cartItem.data) {
      const cartItemId = cartItem.data.find((item) =>
        item.product === product?.id && item?.user === user?.id && product?.product_variant
          ? item.variant === product?.product_variant
          : null,
      )
      if (cartItemId) {
        const response = await request.patch(`CartItem/${cartItemId}`, data)
        if (response.data.success) {
          return response.data.success
        }
      }
    }
  } catch (err) {
    return err
  }
}
export const getUserCart = async (user) => request.get(`CartItem?search=${user[0].mobile}`)
