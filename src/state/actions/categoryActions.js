import { getCategoryList } from 'services/productManagementServices/productCategoryServices'

export const getCategories = () => async (dispatch) => {
  dispatch({ type: 'GET_CATEGORIES_LOADING' })
  try {
    const response = await getCategoryList()
    dispatch({ type: 'GET_CATEGORIES', payload: response.data })
  } catch (err) {
    dispatch({ type: 'GET_CATEGORIES_ERROR', payload: err })
  }
}
