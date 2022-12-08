import React from 'react'

function ProductDescription({ product }) {
  return (
    <div className="product__description box">
      <h3>مشخصات محصول</h3>
      <p>{product.information}</p>
    </div>
  )
}

export default ProductDescription
