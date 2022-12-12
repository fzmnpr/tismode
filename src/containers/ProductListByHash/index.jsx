import ProductCard from 'components/shared/ProductCard'
import NotFound from 'containers/NotFound'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProducts } from 'state/actions/productsActions'

function ProductListByHash() {
  const { hash } = useParams()
  const dispatch = useDispatch()
  const { loading, products } = useSelector((state) => state.products)
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return (
    <div className="hash-products page container">
      {products.length ? (
        <div className="products__list">
          {products.map((product) => (
            <ProductCard product={product} isLoading={loading} key={product.id} />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default ProductListByHash
