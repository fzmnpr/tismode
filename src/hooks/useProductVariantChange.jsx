import { useEffect, useState } from 'react'
import { usePrevious } from './usePrevious'
// TODO: make options on synced
export function useProductVariantChange(response, selectedColor, selectedSize, setSelectedColor, setSelectedSize) {
  const [sizeList, setSizeList] = useState([])
  const [colorList, setColorList] = useState([])
  const prevSize = usePrevious(selectedSize)
  const [product, setProduct] = useState({})
  const [variantError, setVariantError] = useState(null)
  const prevColor = usePrevious(selectedColor)
  useEffect(() => {
    if (response) {
      setSizeList(response.product?.product?.sizes || [])
      setColorList(response.product?.product?.colors || [])
      setProduct(response.product)
    }
  }, [response])
  useEffect(() => {
    //set size list based on color changes
    if (selectedColor !== null && prevColor?.value !== selectedColor?.value) {
      if (response.product.variants) {
        const selected = response.product?.variants?.filter((item) => item.color_variant === selectedColor?.value)
        const newData = selected.find((item) => item.size_variant === selectedSize?.value) || selected[0]
        setProduct({
          ...product,
          product: {
            ...newData,
            image: response.product.product.image,
            productId: response.product.product.id,
            category: response.product.product.category,
          },
        })
        const list = []
        const existingElements = selected?.filter((item) => item.size_variant && item.size_variant)
        if (!existingElements) return
        existingElements.forEach((element) => {
          list.push(element?.size_variant)
        })
        if (!list.length) return
        if (selectedSize && !list?.includes(selectedSize?.value)) {
          setSelectedSize(null)
          setVariantError(' متاسفانه محصولی با این سایز و رنگ موجود نمیباشد!')
        } else {
          if (variantError) setVariantError(null)
        }
      }
    }
    //set color list based on size change
    if (selectedSize !== null && prevSize?.value !== selectedSize?.value) {
      if (response.product.variants) {
        const selected = response.product?.variants?.filter((item) => item.size_variant === selectedSize?.value)
        const newData = selected.find((item) => item.color_variant === selectedColor?.value) || selected[0]
        setProduct({
          ...product,
          product: {
            ...newData,
            image: response.product.product.image,
            productId: response.product.product.id,
            category: response.product.product.category,
          },
        })
        const list = []
        selected
          ?.filter((item) => item.color_variant)
          ?.forEach((element) => {
            list.push(element?.color_variant)
          })
        if (!list.length) return
        if (selectedColor && !list?.includes(selectedColor?.value)) {
          setSelectedColor(null)
          setVariantError(' متاسفانه محصولی با این سایز و رنگ موجود نمیباشد!')
        } else {
          if (variantError) setVariantError(null)
        }
      }
    }
  }, [selectedColor, prevColor, selectedSize, prevSize])
  return { product, sizeList, colorList, variantError }
}
