import { BASE_URL_API } from 'config'
import { toast } from 'react-toastify'
import { request } from 'utils/customAxiosInterceptor'
import { openRequestedTab } from 'utils/openRequestInNewTab'
import { toastConfig } from 'utils/toastConfig'

export const createUserOrder = (data) =>
  request.post('OrderList', {
    ...data,
    paid: false,
  })

export const proceedOrder = async (data, cart, user) => {
  let loading = true
  try {
    const response = await createUserOrder(data)
    if (response.status === 201 || response.status === 200) {
      const order = response.data.id
      const promises = []
      cart.cartItems.forEach((cartItem) => {
        promises.push(
          request.post('ItemOrderList', {
            product: cartItem.product_variant ? cartItem.product_variant : cartItem.id,
            user: user.id,
            variant: cartItem.product_variant ? cartItem.id : null,
            quantity: cartItem.cartAmount,
            order,
          }),
        )
      })
      const result = async () => {
        let status = false
        const ItemOrderList = await Promise.all(promises)
        ItemOrderList?.forEach((item) => {
          if (item?.status === 200) {
            status = true
          }
        })
        return status
      }
      const orderResult = await result()
      if (orderResult === true) {
        localStorage.removeItem('cart')
        openRequestedTab(`${BASE_URL_API}/order/${order}/pay`, 'پرداخت')
        loading = false
      } else {
        toast.error('عملیات با خطا مواجه شد', toastConfig)
      }
    } else {
      toast.error(response.status, toastConfig)
      loading = false
    }

  } catch (error) {
    console.log(error)
    loading = false
  }
  return { loading }
}
// 'http://rayansoft.co/order/payment-verify/?tc=858442437528087'
