/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ProductDetail from 'components/ProductPage/ProductDetail'
import ProductImage from 'components/ProductPage/ProductImage'
import { getProduct } from 'state/actions/productsActions'
import { useParams } from 'react-router-dom'
import NotFound from 'containers/NotFound'
import VoteHeart from 'components/UI/VoteHeart'
import ShareIcon from 'components/UI/Icons/ShareIcon'
import { useProductVariantChange } from 'hooks/useProductVariantChange'
import ProductDescription from 'components/ProductPage/ProductDescription'
import { getProductsOtherImages } from 'services/productManagementServices'
import Breadcrumb from 'components/BreadCrumbs'
import { navigateTo } from 'Routes'

function ProductPage() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const response = useSelector((state) => state.products)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  useEffect(() => {
    dispatch(getProduct(productId))
  }, [productId])

  const { product, colorList, sizeList, variantError } = useProductVariantChange(
    response,
    selectedColor,
    selectedSize,
    setSelectedColor,
    setSelectedSize,
  )
  const [productImages, setProductImages] = useState([])
  const getProductImages = async () => {
    try {
      const allImages = await getProductsOtherImages()
      const productImages = allImages.data
        .filter((image) => image.product === product?.product?.id)
        .map((image) => image.image)
      if (productImages.length) {
        setProductImages(productImages)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProductImages()
  }, [product])
  return (
    <>
      {response.loading ? (
        ''
      ) : response?.product ? (
        <div className="product-page page container">
          {product?.product && (
            <>
              <Breadcrumb
                crumbs={[
                  {
                    name: product.product.category[0].name,
                    link: navigateTo.categoryDetails(
                      product.product.category[0]?.id,
                      product.product.category[0]?.name,
                    ),
                  },
                  {
                    name: `/${product.product.name}`,
                    link: '',
                  },
                ]}
              />
              <div className=" product">
                <div className="product__head__wrapper box">
                  <div className="product__stamp-area">
                    <VoteHeart />
                    <ShareIcon />
                  </div>
                  <ProductImage product={product} images={productImages} loading={response.loading} />
                  <h1 className="product__head__title">{product.product.name}</h1>
                </div>
                <ProductDetail
                  product={product.product}
                  loading={response.loading}
                  sizeList={sizeList}
                  colorList={colorList}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  setSelectedColor={setSelectedColor}
                  setSelectedSize={setSelectedSize}
                  variantError={variantError}
                />
                <div className="product-page__footer">
                  {product?.product?.information ? <ProductDescription product={product.product} /> : null}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default ProductPage
