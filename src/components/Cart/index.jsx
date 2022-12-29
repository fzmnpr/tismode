import React, { useEffect } from 'react'
import CartItems from './CartItems'
import SearchBar from 'components/forms/searchbar'
import { getCart } from 'state/actions'
import { useDispatch, useSelector } from 'react-redux'

function Cart() {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cart)
  useEffect(() => {
    dispatch(getCart())
  }, [])
  return (
    <div className="cart container">
      <SearchBar />
      <div className="cart__title">
        <p>سبد خرید شما</p>
      </div>
      <div className="cart__content">
        {!cart || !cart.length ? (
          <div className="cart__empty">سبد خرید شما خالی است!</div>
        ) : (
          <>
            <div className="cart__items">
              <CartItems cartItems={cart} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
