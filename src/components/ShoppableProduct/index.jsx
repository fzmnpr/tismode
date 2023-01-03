import React from 'react'
import { convertToPersian } from 'utils/convertNumbers'
import priceImage from 'assets/images/Frame 297.png'

function ShoppableProduct({ product }) {
  if (!product) return
  return (
    <div className="shoppable-product">
      <div className="shoppable-product__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="shoppable-product__caption">
        <div className="shoppable-product__title">{product.name}</div>
        <div className="product__price-wrapper">
          <div
            className={`product__price-price  ${
              product?.status !== 'None' ? 'product__price-wrapper--with-option' : ''
            }`}
          >
            <p className={'product__price ' + (product?.discount ? 'product__price--discounted' : '')}>
              {product?.discount ? convertToPersian(product?.total_price) : convertToPersian(product?.unit_price)}{' '}
            </p>
            <img src={priceImage} alt="تومان" className="product__price__unit" />
          </div>
          {product?.discount ? (
            <s className="product__price product__price-discount">{convertToPersian(product?.unit_price)}</s>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ShoppableProduct
