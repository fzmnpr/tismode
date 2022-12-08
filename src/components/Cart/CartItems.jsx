import ProductCard from 'components/shared/ProductCard'
import CartInfos from './CartInfos'

function CartItems({ cartItems }) {
  return (
    <>
      {cartItems.length &&
        cartItems.map((item) => {
          return <ProductCard product={item} key={item.id} isInCart={true} />
        })}
      {cartItems.length && <CartInfos cart={cartItems} />}
    </>
  )
}

export default CartItems
