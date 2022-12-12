import { useState } from 'react'
import ColorPicker from './productUserActions/ColorPicker'
import ProductPriceArea from './ProductPriceArea'
import SizePicker from './productUserActions/SizePicker'

function ProductDetail({
  product,
  loading,
  sizeList,
  colorList,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  variantError,
}) {
  return (
    <div className="product__detail">
      <div className="product__detail__infos">
        <div className="product__info">
          <div className="product__info__details">
            {product.status === 'None' ? null : (
              <div className="box product__options-box">
                <div className="product__options">
                  {sizeList?.length ? (
                    <SizePicker setSelectedSize={setSelectedSize} selectedSize={selectedSize} sizeList={sizeList} />
                  ) : null}
                  {colorList?.length ? (
                    <ColorPicker
                      setSelectedColor={setSelectedColor}
                      selectedColor={selectedColor}
                      colorList={colorList}
                    />
                  ) : null}
                </div>
                {variantError ? <p className="error-message variant-error">{variantError}</p> : null}
              </div>
            )}
          </div>
          <ProductPriceArea
            response={product}
            loading={loading}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
