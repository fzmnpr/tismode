import React from 'react'
import discountShapeIcon from 'assets/images/discount-shape.svg'
import ArrowLeftIcon from 'assets/icons/arrow-white.png'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from 'Routes'
function DiscountOffer() {
  return (
    <div className="dsicount-offer">
      <img src={discountShapeIcon} alt="discount" />
      <h5>تخفیف ویژه</h5>
      <p className="desktop-none mobile-desc">محصولات ما را با تخفیف خرید کنید</p>
      <Link to={ROUTE_PATHS.discounted}>
        <div className="dsicount-offer__link">
          <p className="display-none">مشاهده همه محصولات</p>
          <p className="desktop-none">مشاهده همه</p>
          <img src={ArrowLeftIcon} />
        </div>
      </Link>
    </div>
  )
}

export default DiscountOffer
