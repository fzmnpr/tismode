const initialState = {
  user: null,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_FROM_STORAGE':
      return {
        ...state,
        user: action.payload,
      }
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'REMOVE_USER':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}
