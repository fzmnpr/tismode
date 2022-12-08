import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from 'components/shared/Modal'
import { getProductVariants } from 'services/productManagementServices/productVariantServices'
import SizePicker from 'components/ProductPage/productUserActions/SizePicker'
import ColorPicker from 'components/ProductPage/productUserActions/ColorPicker'
import { usePrevious } from 'hooks/usePrevious'
import { addToCart } from 'state/actions'
import { useDispatch } from 'react-redux'
import CircularLoading from 'components/UI/CircularLoading'
function ProductVariantModal({ product, size, colorList }) {
  const [open, setOpen] = useState(false)
  const [productVariants, setProductVariants] = useState([])
  const [sizes, setSizes] = useState([])
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [colors, setColors] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [currentProduct, setCurrentProduct] = useState(product)
  const [loading, setLoading] = useState(false)
  const prevColor = usePrevious(selectedColor)
  const prevSize = usePrevious(selectedSize)
  const dispatch = useDispatch()
  const handleClose = () => setOpen(false)
  const handleConfirm = () => {
    dispatch(
      addToCart(
        {
          ...currentProduct,
          product_variant: currentProduct.id,
          id: product.id,
          image: product.image,
          sizes: sizes,
          colors: colors,
          discount_price: product.discount ? Math.floor(product.unit_price - product.total_price) | 0 : 0,
        },
        {
          color: selectedColor,
          size: selectedSize,
          cartAmount: quantity,
        },
        false,
      ),
    )
  }
  const getVariants = useCallback(async () => {
    setLoading(true)
    const { data } = await getProductVariants()
    if (!data) return
    if (data) {
      const variants = data.filter((item) => item.product_variant === currentProduct?.id)
      setProductVariants(variants)
      variants.forEach((item) => {
        if (item.size_variant && !sizes.includes(item.size_variant)) {
          setSizes([...sizes, item.size_variant])
        }
        if (item.color_variant && !colors.includes(item.color_variant)) {
          setColors([...colors, item.color_variant])
        }
      })
    }
    setLoading(false)
  }, [sizes, colors, currentProduct])

  useEffect(() => {
    if (open) getVariants()
  }, [open])
  console.log(loading)
  useEffect(() => {
    if (prevColor?.id !== selectedColor?.id) {
      if (productVariants) {
        const selected = productVariants?.filter((item) => item.color_variant === selectedColor?.id)
        setCurrentProduct(
          selectedSize ? selected.find((item) => item.size_variant === selectedSize?.value) : selected[0],
        )
        const list = []
        selected
          ?.filter((item) => item.size_variant)
          ?.forEach((element) => {
            if (element.size_variant) {
              list.push(element.size_variant)
            }
          })
        if (!list.length) return
        const uniqueSizes = [...new Set(list)]
        setSizes(uniqueSizes)
      }
    }
    if (prevSize?.value !== selectedSize?.value) {
      if (productVariants) {
        const selected = productVariants?.filter((item) => item.size_variant === selectedSize?.value)
        setCurrentProduct(
          selectedColor ? selected.find((item) => item.color_variant === selectedColor?.id) : selected[0],
        )
        const list = []
        selected
          ?.filter((item) => item.size_variant)
          ?.forEach((element) => {
            if (element.size_variant) {
              list.push(element.color_variant)
            }
          })
        if (!list.length) return
        const uniqueSizes = [...new Set(list)]
        setColors(uniqueSizes)
      }
    }
  }, [selectedColor, selectedSize, prevColor, prevSize, productVariants])
  return (
    <div>
      <button className="thumbnail__variant__button" onClick={() => setOpen(true)}>
        گزینه های محصول
      </button>
      <Modal
        open={open}
        setOpen={setOpen}
        title={'گزینه های محصول'}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={currentProduct?.amount}
      >
        {loading ? (
          <CircularLoading />
        ) : (
          <div className="product-variant-modal">
            {sizes.length ? (
              <div className="product-variant-modal__sizes">
                <SizePicker data={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
              </div>
            ) : null}
            {colors.length ? (
              <div className="product-variant-modal__colors">
                <ColorPicker
                  data={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  colorList={colorList}
                />
              </div>
            ) : null}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ProductVariantModal
