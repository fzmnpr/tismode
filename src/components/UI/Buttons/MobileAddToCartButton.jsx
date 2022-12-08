import React from 'react'
import shoppingBagIcon from 'assets/icons/shopping-cart2.svg'
import { addToCart } from 'state/actions'
import { useDispatch } from 'react-redux'

function MobileAddToCartButton({ product }) {
  const dispatch = useDispatch()
  return (
    <div
      className="mobile__shopping-cart"
      onClick={() => {
        dispatch(
          addToCart(
            product,
            {
              color: product?.color[0] || null,
              size: product?.size[0] || null,
              cartAmount: 1,
            },
            false,
          ),
        )
      }}
    >
      <img src={shoppingBagIcon} alt="shopping-bag" />
    </div>
  )
}

export default MobileAddToCartButton
