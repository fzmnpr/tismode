import MoneyIcon from 'components/UI/MoneyIcon'
import priceImage from 'assets/images/Frame 297.png'
import { convertToPersian } from 'utils/convertNumbers'
import { useEffect, useState } from 'react'

function CheckoutPriceInfos({ cart, deliveryMethod }) {
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  useEffect(() => {
    if (deliveryMethod) {
      if (deliveryMethod === 'post') {
        setDeliveryPrice(25000)
      } else {
        setDeliveryPrice(0)
      }
    }
  }, [deliveryMethod])
  return (
    <div className="checkout-price-infos checkout-box-item">
      <h3>جزئیات قیمت:</h3>
      <div className="checkout-price-infos__body">
        <span>
          <MoneyIcon />
        </span>
        <ul className="checkout-price-infos__items">
          <li className="checkout-price-infos__item">
            <span>قیمت کالاها:</span>
            <span className="checkout-price-infos__item__price">
              {convertToPersian(cart.totalPrice)}
              <img src={priceImage} alt="تومان" />
            </span>
          </li>
          {cart.totalDiscount > 0 ? (
            <li className="checkout-price-infos__item">
              <span>تخفیف کالاها:</span>
              <span className="checkout-price-infos__item__price checkout-price-infos__item__price--discount">
                {convertToPersian(cart.totalDiscount)}
                <img src={priceImage} alt="تومان" />
              </span>
            </li>
          ) : null}
          <li className="checkout-price-infos__item">
            <span>هزینه ارسال:</span>
            <span className="checkout-price-infos__item__price">
              {deliveryMethod ? (
                deliveryMethod === 'post' ? (
                  <>
                    {convertToPersian(25000)}
                    <img src={priceImage} alt="تومان" />
                  </>
                ) : (
                  'پس کرایه'
                )
              ) : (
                <>
                  {convertToPersian(0)}
                  <img src={priceImage} alt="تومان" />
                </>
              )}
            </span>
          </li>
          <li className="checkout-price-infos__item">
            <span>جمع کل:</span>
            <span className="checkout-price-infos__item__price">
              {convertToPersian(cart.totalPrice + deliveryPrice)}
              <img src={priceImage} alt="تومان" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CheckoutPriceInfos
