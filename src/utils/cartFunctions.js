import { toast } from 'react-toastify'
import { toastConfig } from './toastConfig'

export const cartHasError = (product, data) => {
  if (product.colors?.length && data.color === null) {
    toast.error('لطفا رنگ محصول را انتخاب کنید', toastConfig)
    return true
  }
  if (product.sizes?.length && data.size === null) {
    toast.error('لطفا سایز محصول را انتخاب کنید', toastConfig)
    return true
  }
  if (product.sizes?.length && data.size !== null && product.colors?.length && data.color !== null) {
    return false
  }
}
