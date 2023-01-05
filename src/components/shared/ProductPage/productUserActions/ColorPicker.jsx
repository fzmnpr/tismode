import { ProductColor } from 'components/shared/ProductColor'
function ColorPicker({ selectedColor, setSelectedColor, colorList }) {
  return (
    <div className="product__info__color product__option">
      <p className="product__option__title">رنگ</p>
      <div className="color-list">
        <ProductColor setSelectedColor={setSelectedColor} selectedColor={selectedColor} colorList={colorList} />
      </div>
    </div>
  )
}

export default ColorPicker
