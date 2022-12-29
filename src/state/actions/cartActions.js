import { toast } from 'react-toastify'
import { addCartToServer, getUserCart, updateCartInServer } from 'services/cartServices'
import { getProductList } from 'services/productManagementServices'
import { cartHasError } from 'utils/cartFunctions'
import { toastConfig } from 'utils/toastConfig'

export const getCart = () => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem('cart'))
  dispatch({
    type: 'GET_CART',
    payload: cart,
  })
}

export const getCartCount = (count) => (dispatch) => {
  dispatch({
    type: 'GET_CART_COUNT',
    payload: count,
  })
}
/**
 * 
 * @param {Object} product the actual product
 * @param {Object} data  the selected variant eg.color, size
 * @param {boolean} isInCart are we in the cart page or any other pages?
 */
export const addToCart = (product, data, isInCart) => (dispatch) => {
  const hasError =  cartHasError(product, data)
  if (hasError) return

  const { color, size, cartAmount } = data
  const cart = JSON.parse(localStorage.getItem('cart'))
  const user = JSON.parse(localStorage.getItem('user'))
  if (cart) {
    const cartItem = cart.find((item) =>
      //if our product have any variants we need to select the exact selected variant of the product so that different sizes or colors would be different products in the cart
      item.product_variant
        ? item.id === product.id && item.product_variant === product.product_variant
        : item.id === product.id,
    )
    if (cartItem) {
      if (cartAmount <= product.amount) {
        cartItem.cartAmount = cartAmount
        localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        toast.error('موجودی محصول کافی نیست', toastConfig)
        return
      }
    } else {
      cart.push({ ...product, color, size, cartAmount })
      localStorage.setItem('cart', JSON.stringify(cart))
      toast.success('محصول به سبد خرید اضافه شد', toastConfig)
    }
  } else {
    const cart = [{ ...product, color, size, cartAmount, id: product.id }]
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  const sendingUser = user && user[0] ? user[0] : user
  const sendingProduct = cart && cart[0] ? cart[0] : cart
  if (isInCart && user) {
    updateCartInServer(sendingUser, sendingProduct, 'update')
  } else if (!isInCart && user) {
    // if we don' have a logged in user we don't need to add the product to the server just save it in the local storage
    addCartToServer(sendingProduct, sendingUser)
  }
  dispatch({
    type: 'ADD_TO_CART',
    payload: cart,
  })
}

export const deleteFromCart = (product) => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const cart = JSON.parse(localStorage.getItem('cart'))
  const newCart = cart.filter((item) => item.id !== product.id,
  )
  localStorage.setItem('cart', JSON.stringify(newCart))
  if (user) {
    updateCartInServer(user, product, 'delete')
  }
  dispatch({
    type: 'DELETE_FROM_CART',
    payload: newCart,
  })
}
export const getUserCartFromStorage = (user) => async (dispatch) => {
  const currentCart = JSON.parse(localStorage.getItem('cart'))
  const userCartInfo = await getUserCart(user)
  const products = await getProductList()
  let finalCart = []
  //we need to change the cart based on previous cartItems of user only if there is any
  if (userCartInfo.data?.data.length > 0) {
    //merge  duplicated products (from server) in the cart into one with the quantity and price
    const uniqueCartItems = userCartInfo.data.data.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.product === item.product && i.variant === item.variant)
      if (!existingItem) {
        acc.push(item)
      } else {
        existingItem.quantity += item.quantity
        existingItem.total_price += item.total_price
        existingItem.unit_price += item.unit_price
      }
      return acc
    }, [])

    if (userCartInfo && currentCart) {
      //if the user has a cart in the local storage
      //we need to merge the cart with the user cart
      uniqueCartItems.forEach(async (item) => {
        //find the product in the cart and add the quantity and other info to the cart
        const cartItem = currentCart.find((item2) => item2.id === item.id || item2.id === item.variant)
        if (cartItem) {
          const cartAmount = cartItem.cartAmount + item.quantity
          finalCart = [
            ...finalCart,
            {
              cartAmount,
              id: cartItem.id,
              product_variant: item.product || null,
              color: cartItem.color,
              image: products.data.find((product) => product.id === item.product)?.image,
              product: cartItem.product,
              name: cartItem.name,
              total_price: Math.round(((cartItem.unit_price * cartItem.discount) / 100) * cartAmount),
              unit_price: cartItem.unit_price * cartAmount,
              discount_price: cartItem.discount_price * cartAmount,
              size: cartItem.size,
              amount: item.amount,
            },
          ]
        } else {
          finalCart = [
            ...finalCart,
            {
              cartAmount: item.quantity,
              id: item.variant || item.product,
              product_variant: item.product || null,
              color: item.color,
              image: products.data.find((product) => product.id === item.product)?.image,
              product: item.product,
              name: item.name,
              total_price: Math.round(((item.unit_price * item.discount) / 100) * item.quantity),
              unit_price: item.unit_price * item.quantity,
              discount_price: item.discount_price * item.quantity,
              size: item.size,
              amount: item.amount,
            },
          ]
        }
      })
    } else if (userCartInfo && !currentCart) {
      finalCart = uniqueCartItems.map((item) => {
        return {
          ...item,
          cartAmount: item.quantity,
          id: item.variant || item.product,
          product_variant: item.product || null,
          total_price: Math.round(((item.unit_price * item.discount) / 100) * item.quantity),
          unit_price: item.unit_price * item.quantity,
          discount_price: item.discount_price * item.quantity,
          image: products.data.find((product) => product.id === item.product)?.image,
        }
      })
    }
    localStorage.setItem('cart', JSON.stringify(finalCart))
  }
  dispatch({
    type: 'GET_USER_CART_FROM_STORAGE',
    payload: finalCart,
  })
}
