import React, { useEffect, useState } from 'react'
import addIcon from 'assets/icons/add-circle.svg'
import decrementIcon from 'assets/icons/lower-circle.svg'
import { toast } from 'react-toastify'
import { toastConfig } from 'utils/toastConfig'
import { useDispatch } from 'react-redux'
import { addToCart } from 'state/actions'

function MiniAddToCartbtn({ product, isInCart }) {
  const [amount, setAmount] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    if (product && product.cartAmount) {
      setAmount(product.cartAmount)
    }
  }, [product])
  function deleteFromCart() {
    const newAmount = amount - 1
    const color = product.color ? product.color[0] || product.color : null
    const size = product.size ? product.size[0] || product.size : null
    setAmount(newAmount)
    dispatch(
      addToCart(
        product,
        {
          color,
          size,
          cartAmount: newAmount,
          discount_price: product.discount ? Math.floor(product.unit_price - product.total_price) | 0 : 0,
        },
        isInCart,
      ),
    )
  }
  function AddToCart(type) {
    if (type === 'add') {
      if (amount < product.amount) {
        const newAmount = amount + 1
        setAmount(newAmount)
        const color = product.color ? product.color[0] || product.color : null
        const size = product.size ? product.size[0] || product.size : null
        dispatch(
          addToCart(
            product,
            {
              color,
              size,
              cartAmount: newAmount,
            },
            isInCart,
          ),
        )
      } else {
        toast.error('موجودی محصول کافی نیست', toastConfig)
        return
      }
    } else if (type === 'delete') {
      if (isInCart) {
        if (amount > 1) {
          deleteFromCart()
        }
      } else {
        if (amount > 0) {
          deleteFromCart()
        }
      }
    }
  }

  return (
    <div className="add-to-cart-m">
      <img src={addIcon} alt="add" onClick={() => AddToCart('add')} />
      <span id="count">{amount}</span>
      <img src={decrementIcon} alt="delete" onClick={() => AddToCart('delete')} />
    </div>
  )
}

export default MiniAddToCartbtn
