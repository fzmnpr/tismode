import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Skeleton } from '@mui/material'
import { addToCart, deleteFromCart } from 'state/actions'
import { convertToPersian } from 'utils/convertNumbers'
import AddIcon from 'components/UI/Icons/AddIcon'
import MinusIcon from 'components/UI/Icons/MinusIcon'
import { toast } from 'react-toastify'
import { toastConfig } from 'utils/toastConfig'

function ProductPriceArea({ response, loading, selectedSize, selectedColor }) {
  const [amount, setAmount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      const cartItemAmount = cart.find((item) => item.id === response.id)?.cartAmount
      setAmount(cartItemAmount || 0)
    }
  }, [response])
  const hasError = () => {
    if ((response?.colors?.length || response?.color_variant) && !selectedColor) {
      toast.error('لطفا رنگ محصول را انتخاب کنید', toastConfig)
      return true
    }
    if ((response?.sizes?.length || response?.size_variant) && !selectedSize) {
      toast.error('لطفا سایز محصول را انتخاب کنید', toastConfig)
      return true
    }
    return false
  }
  const handleProductAddToCart = (method) => {
    if (hasError()) return
    if (method === 'add') {
      if (amount === response?.amount) {
        toast.error('موجودی محصول کافی نیست', toastConfig)

        return
      } else {
        const quantity = amount + 1
        setAmount(quantity)
        dispatch(
          addToCart(
            response,
            {
              color: selectedColor,
              size: selectedSize,
              cartAmount: quantity,
            },
            false,
          ),
        )
      }
    } else {
      const quantity = amount - 1
      setAmount(quantity)
      if (quantity === 0) {
        dispatch(deleteFromCart(response))
        return
      }
      setAmount(quantity)
      dispatch(
        addToCart(
          response,
          {
            color: selectedSize,
            size: selectedColor,
            cartAmount: quantity,
          },
          false,
        ),
      )
    }
  }
  return (
    <>
      <div className="product__info__price">
        {response.amount > 0 ? (
          loading ? (
            <Skeleton variant="text" width={200} animation="wave" />
          ) : (
            <>
              <div>
                <p className={'product-price ' + (response?.discount ? 'discounted' : '')}>
                  {response?.discount
                    ? convertToPersian(response?.total_price)
                    : convertToPersian(response?.unit_price)}{' '}
                  تومان
                </p>
                {response?.discount ? (
                  <s className="discount-price">{convertToPersian(response?.unit_price)} تومان</s>
                ) : null}
              </div>

              <div className="product__quantity">
                <span className="product__quantity__add" onClick={() => handleProductAddToCart('add')}>
                  <AddIcon />
                </span>
                <span className="product__quantity__number">{amount}</span>
                <span className="product__quantity__remove" onClick={() => handleProductAddToCart('delete')}>
                  <MinusIcon />
                </span>
              </div>
            </>
          )
        ) : (
          <p>متاسفانه محصول موجود نیست</p>
        )}
      </div>
    </>
  )
}

export default ProductPriceArea
