import ShoppableProducts from 'components/Mobile/ShppableProducts'
import TismodDivider from 'components/UI/TismodDivider'
import React from 'react'

function RecommendedProducts({ products, loading }) {
  return (
    <>
      <TismodDivider title={' محصولات پیشنهادی'} />
      <div className="shop shop-new">
        <ShoppableProducts products={products} loading={loading} />
      </div>
    </>
  )
}

export default RecommendedProducts
