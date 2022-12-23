import React, { memo } from 'react'

const ProductDescription = memo(function ProductDescription({ product }) {
  return (
    <div className="product__description box">
      <h3>مشخصات محصول</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: product.information,
        }}
      ></p>
    </div>
  )
})

export default ProductDescription
