const initialState = {
  cart: [],
  cartCount: 0,
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CART':
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload?.length || 0,
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload?.length || 0,
      }
    case 'DELETE_FROM_CART':
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload?.length || 0,
      }
    case 'GET_USER_CART_FROM_STORAGE':
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload?.length || 0,
      }
    default:
      return state
  }
}
