import { Skeleton } from '@mui/material'
import ProductCard from 'components/shared/ProductCard'
import React, { useEffect } from 'react'
import { getProductList } from 'services/productManagementServices'

function DisCountedProducts() {
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const loadingArray = new Array(6).fill(true)

  const getProducts = async () => {
    try {
      const products = await getProductList()
      if (products.data) {
        const discounted = products.data.filter((item) => item.discount)
        setProducts(discounted)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="container">
      {loading ? (
        <div className="product__grid">
          {loadingArray.map((item, index) => (
            <div key={index} className="product-card">
              <Skeleton variant="rectangular" height={284} width={188} animation="wave" />
            </div>
          ))}
        </div>
      ) : (
        <div className="product__grid">
          {products.map((product, index) => (
            <>
              <ProductCard product={product} />
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default DisCountedProducts
