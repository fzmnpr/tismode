import priceImage from 'assets/images/toman.png'
import { useNavigate } from 'react-router-dom'
import { convertToPersian } from 'utils/convertNumbers'
function CartInfos({ cart }) {
  const navigate = useNavigate()
  return (
    <div className="cart__payment__method" onClick={() => navigate('/checkout')}>
      {cart.length ? (
        <button className="cart__payment__method__continue">
          {' '}
          <div className="cart__payment__method__price">
            {cart.length > 0
              ? convertToPersian(cart.reduce((a, b) => a + b.total_price * b.cartAmount, 0))
              : cart[0]?.total_price}
            <img src={priceImage} alt="" />
          </div>
          <div className="cart__payment__method__text">ادامه خرید</div>
        </button>
      ) : null}
    </div>
  )
}

export default CartInfos
