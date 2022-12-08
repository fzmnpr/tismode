import { request } from 'utils/customAxiosInterceptor'

export const getCategoryList = () => request.get('Category')
