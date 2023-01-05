import { convertToPersian } from 'utils/convertNumbers'
import { detectColorByName } from 'utils/detectColorByName'

export const productColor = (color) => {
  return (
    <div className="color-item">
      <div
        className="cart__item-color color-item__color"
        style={{ backgroundColor: detectColorByName(color.name) }}
      ></div>
    </div>
  )
}

export const FinalProductPrice = (price, amount) => {
  return convertToPersian(price * amount)
}
