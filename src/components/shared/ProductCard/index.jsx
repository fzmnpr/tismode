import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
import { convertToPersian } from 'utils/convertNumbers'
import priceImage from 'assets/images/Frame 297.png'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import AddIcon from 'components/UI/Icons/AddIcon'
import DeleteIcon from 'components/UI/Icons/DeleteIcon'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, deleteFromCart } from 'state/actions'
import { toast } from 'react-toastify'
import { toastConfig } from 'utils/toastConfig'

const styles = {
  display: 'flex',
  maxHeight: '162px',
  background: ' rgba(255, 255, 255, 0.8)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 10px 18px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  padding: '7px',
  marginBottom: '16px',
}
function ProductCard({ product, isInCart }) {
  const [amount, setAmount] = useState(product.cartAmount || null)
  const dispatch = useDispatch()
  const handleProductAddToCart = (method) => {
    const color = product.color ? product.color.label : null
    const size = product.size ? product.size.label : null
    if (method === 'add') {
      if (amount === product?.amount) {
        toast.error('موجودی محصول کافی نیست', toastConfig)
        return
      } else {
        const quantity = amount + 1
        setAmount(quantity)
        dispatch(
          addToCart(
            product,
            {
              color,
              size,
              cartAmount: quantity,
            },
            false,
          ),
        )
      }
    } else {
      dispatch(deleteFromCart(product))
    }
  }

  return (
    <>
      {product && (
        <Card sx={styles} to={navigateTo.productDetails(product?.id)} className="product__card">
          <CardContent
            sx={{
              display: 'flex',
              width: '100%',
              padding: '7px',
              paddingBottom: '0 !important',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ padding: 0 }}>
              <Link to={navigateTo.productDetails(product.productId || product?.id)}>
                <CardMedia
                  component="img"
                  sx={{
                    minWidth: '116px',
                    maxHeight: '113px',
                    border: '0.5px solid #E0E0E0',
                  }}
                  image={product.image}
                  alt={product?.name}
                />
              </Link>

              {isInCart ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                  }}
                >
                  <span className="cart__item__icon" onClick={() => handleProductAddToCart('add')}>
                    <AddIcon />
                  </span>
                  <span className="cart__item__amount">{convertToPersian(amount)}</span>
                  <span className="cart__item__icon" onClick={() => handleProductAddToCart('delete')}>
                    <DeleteIcon />
                  </span>
                </Box>
              ) : null}
            </Box>
            <Link to={navigateTo.productDetails(product.productId || product?.id)}>
              <Box
                className="thumbnail__caption"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <p className="product__title">{product?.name}</p>
                <div
                  className={`product__price-wrapper  ${
                    product?.status !== 'None' ? 'product__price-wrapper--with-option' : ''
                  }`}
                >
                  <p className={'product__price ' + (product?.discount ? 'product__price--discounted' : '')}>
                    {product?.discount ? convertToPersian(product?.total_price) : convertToPersian(product?.unit_price)}{' '}
                  </p>
                  <img src={priceImage} alt="" />

                  {product?.discount ? (
                    <s className="product__price product__price-discount">{convertToPersian(product?.unit_price)}</s>
                  ) : null}
                </div>
              </Box>
            </Link>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default ProductCard
