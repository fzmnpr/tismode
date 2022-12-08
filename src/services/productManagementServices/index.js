import { request } from 'utils/customAxiosInterceptor'

export const getProductList = () => request.get('Product')
export const getProductDetails = (id) => request.get(`Product_Details/${id}`)
export const getProductsOtherImages = () => request.get('Images')
