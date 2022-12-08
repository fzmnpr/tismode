import { request } from 'utils/customAxiosInterceptor'

export const getProductVariants = () => request.get('Variants')
export const getSizes = () => request.get('Size')
export const getColors = () => request.get('Color')
