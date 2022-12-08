import ProductSize from 'components/shared/ProductSize'

function SizePicker({ sizeList, selectedSize, setSelectedSize }) {
  return (
    <div className="product__info__size product__option">
      <p className="product__option__title">سایز</p>
      <div className="size-list">
        <ProductSize sizeList={sizeList} setSelectedSize={setSelectedSize} selectedSize={selectedSize} />
      </div>
    </div>
  )
}

export default SizePicker
