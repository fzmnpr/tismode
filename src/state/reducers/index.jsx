import { productsReducer } from './productsReducer'
import { combineReducers } from 'redux'
import { categoryReducer } from './categoryReducer'
import { cartReducer } from './cartReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoryReducer,
  cart: cartReducer,
  users: userReducer,
})
