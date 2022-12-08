const initialState = {
  categories: [],
  loading: false,
  error: null,
}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        loading: false,
      }
    case 'GET_CATEGORIES_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
