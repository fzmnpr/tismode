import { getProductDetails, getProductList } from 'services/productManagementServices'

import { getProductVariants } from 'services/productManagementServices/productVariantServices'

export const getProducts = () => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_LOADING' })
  try {
    const response = await getProductList()
    dispatch({ type: 'GET_PRODUCTS', payload: response.data })
  } catch (err) {
    dispatch({ type: 'GET_PRODUCTS_ERROR', payload: err })
  }
}
export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCT_LOADING' })
  try {
    const product = await getProductDetails(id)
    const variants = await getProductVariants()
    if (variants.data.length > 0) {
      const productVariant = variants.data.filter((item) => parseInt(item.product_variant) === parseInt(id))
      //if we find out the product has variants we need to get the variants
      if (productVariant) {
        dispatch({
          type: 'GET_PRODUCT',
          payload: {
            product: {
              ...product.data,
              colors: [
                ...new Set(
                  productVariant.filter((item) => item.color_variant !== null)?.map((item) => item.color_variant),
                ),
              ],
              sizes: [
                ...new Set(
                  productVariant.filter((item) => item.size_variant !== null)?.map((item) => item.size_variant),
                ),
              ],
              discount_price: product.data.discount
                ? Math.round(product.data.unit_price - product.data.total_price) | 0
                : 0,
            },
            variants: [
              ...productVariant,
              ...productVariant.map((item) => ({
                ...item,
                // product_id: response.data.id,
                totalAmount: product.data.amount,
                //product variant is the variant id of the product
                product_variant: item.id,
                color: item.color_variant,
                size: item.size_variant,
                colors: [
                  ...new Set(
                    productVariant.filter((item) => item.color_variant !== null)?.map((item) => item.color_variant),
                  ),
                ],
                sizes: [
                  ...new Set(
                    productVariant.filter((item) => item.size_variant !== null)?.map((item) => item.size_variant),
                  ),
                ],
                amount: item.amount,
                total_price: item.total_price,
                unit_price: item.unit_price,
                discount_price: item.discount ? Math.floor(item.unit_price - item.total_price) | 0 : 0,
                name: item.name,
                information: product.data.information,
                // we set the id of the variant to the product id so that we could use it in #addCartToServer function without having to search for the product id
                id: product.data.id,
                image: product.data.image,
              })),
            ],
          },
        })
      }
    } else {
      dispatch({ type: 'GET_PRODUCT', payload: { product: product.data } })
    }
  } catch (err) {
    dispatch({ type: 'GET_PRODUCT_ERROR', payload: err })
  }
}
