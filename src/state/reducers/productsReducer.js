const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      }

    case 'GET_PRODUCTS_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'GET_PRODUCT_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_PRODUCT':
      return {
        ...state,
        product: action.payload,
        loading: false,
      }
    case 'GET_PRODUCT_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
