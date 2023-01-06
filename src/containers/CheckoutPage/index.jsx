import CheckoutAddress from 'components/Mobile/Checkout/CheckoutAddress'
import AnimatedLoading from 'components/UI/AnimatedLoading'
import React from 'react'
import { proceedOrder } from 'services/orderServices'
import { request } from 'utils/customAxiosInterceptor'
import DeliveryMethod from 'components/Mobile/Checkout/DeliveryMethod'
import AddIcon from 'components/UI/Icons/AddIcon'

import { Alert } from '@mui/material'
import CheckoutAddAddress from 'components/Mobile/Checkout/CheckoutAddAddress'
import CheckoutPriceInfos from 'components/Mobile/Checkout/CheckoutPriceInfos'
import CheckoutProducts from 'components/Mobile/Checkout/CheckoutProducts'
function CheckoutPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)
  const [openForm, setOpenForm] = React.useState(false)
  const [cart, setCart] = React.useState()
  const [selectedAddress, setSelectedAddress] = React.useState()
  const [checkoutLoading, setCheckoutLoading] = React.useState(false)
  const [deliveryMethod, setDeliveryMethod] = React.useState(null)
  const [checkoutError, setCheckoutError] = React.useState(null)
  const getUserInfo = () => {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      setUser(JSON.parse(userInfo)[0])
    }
  }
  const getAddresses = async () => {
    const userAddresses = JSON.parse(localStorage.getItem('address'))
    if (userAddresses) {
      setSelectedAddress(userAddresses)
      setIsLoading(false)
    } else {
      const response = await request.get(`Addresslist?search=${user.mobile}`)
      const data = response.data
      if (!data.length) {
        setIsLoading(false)
        return
      }
      const lastAddress = data[data.length - 1]
      setSelectedAddress(lastAddress)
      setIsLoading(false)
    }
  }
  const getUserCartInfo = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart?.length) {
      setCart({
        cartItems: cart,
        totalPrice: cart.reduce((a, b) => a + b.total_price * b.cartAmount, 0),
        totalDiscount: cart.reduce((a, b) => a.discount_price + b.discount_price),
        deliveryPrice: deliveryMethod ? (deliveryMethod === 'post' ? 25000 : 'پس کرایه') : 0,
      })
    }
  }
  React.useEffect(() => {
    getUserInfo()
  }, [])
  React.useEffect(() => {
    if (user) {
      getUserCartInfo()
      getAddresses()
    }
  }, [user])

  const submitAddress = async () => {
    if (isLoading) return
    if (!selectedAddress) {
      setCheckoutError('لطفا  آدرس ارسالی را وارد نمایید')
      return
    }
    if (!deliveryMethod) {
      setCheckoutError('لطفا روش ارسال را مشخص کنید')
      return
    }
    if (checkoutError) setCheckoutError(null)
    setCheckoutLoading(true)
    const orderInfos = {
      user: user.id,
      receiver_phone: selectedAddress.receiver_phone,
      city: selectedAddress.city,
      province: selectedAddress.province,
      f_name: selectedAddress.f_name,
      l_name: selectedAddress.l_name,
      code: selectedAddress.code,
      address: selectedAddress.address,
      /**   
        'delivered', 
        'in_progress', 
        'unpaided',
        'cancelled',
    )*/
      status: 'unpaided',
      shipping: deliveryMethod,
    }
    const { loading } = await proceedOrder(orderInfos, cart, user)
    setCheckoutLoading(false)
  }
  return (
    <div className="container checkout">
      {isLoading ? (
        <AnimatedLoading isFullPage={true} background={'#f8043f'} />
      ) : (
        <>
          {checkoutError ? (
            <Alert severity="warning" sx={{ marginTop: '16px' }}>
              {checkoutError}
            </Alert>
          ) : null}
          <div className="checkout__container addresses">
            {selectedAddress ? (
              <div className="addresses__list">
                <CheckoutAddress address={selectedAddress} openForm={openForm} setOpenForm={setOpenForm} />
              </div>
            ) : (
              <div onClick={() => setOpenForm(true)} className="addresses__list__item">
                <AddIcon />
                <p className="addresses__add-new__text">افزودن آدرس </p>
              </div>
            )}
          </div>
          <DeliveryMethod deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
          <CheckoutProducts cart={cart} />
          <CheckoutPriceInfos cart={cart} deliveryMethod={deliveryMethod} />
          <button type="submit" className="checkout__submit-btn" onClick={submitAddress} disabled={isLoading}>
            {checkoutLoading ? <AnimatedLoading bottom={'0.5rem'} background={'#ffff'} /> : 'ثبت اطلاعات و پرداخت'}
          </button>
        </>
      )}
      {openForm ? (
        <CheckoutAddAddress
          openForm={openForm}
          setOpenForm={setOpenForm}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
          user={user}
        />
      ) : null}
    </div>
  )
}

export default CheckoutPage
