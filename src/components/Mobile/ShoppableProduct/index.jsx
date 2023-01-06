import React from 'react'
import { convertToPersian } from 'utils/convertNumbers'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
import RegularPricePrefix from 'components/UI/Icons/PricePrefix/RegularPricePrefix'

function ShoppableProduct({ product }) {
  if (!product) return
  return (
    <Link to={navigateTo.productDetails(product.id, product.name)}>
      <div className="shoppable-product">
        <div className="shoppable-product__image">
          <img src={product.image} alt={product.name} />
          <div className="shoppable-product__title">{product.name}</div>
        </div>
        <div className="shoppable-product__caption">
          <div className="product__price-wrapper">
            <div
              className={`product__price-price  ${
                product?.status !== 'None' ? 'product__price-wrapper--with-option' : ''
              }`}
            >
              <p className={'product__price ' + (product?.discount ? 'product__price--discounted' : '')}>
                {product?.discount ? convertToPersian(product?.total_price) : convertToPersian(product?.unit_price)}{' '}
              </p>
              <RegularPricePrefix />
            </div>
            {product?.discount ? (
              <s className="product__price product__price-discount">{convertToPersian(product?.unit_price)}</s>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ShoppableProduct
