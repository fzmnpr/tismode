import { request } from 'utils/customAxiosInterceptor'

export const getGalleryImages = () => request.get('Gallery')
