import ShoppableProducts from 'components/Mobile/ShppableProducts'
import TismodDivider from 'components/UI/TismodDivider'
import React from 'react'

function NewProducts({ products, loading }) {
  return (
    <>
      <TismodDivider title={'جدیدترین محصولات'} />
      <div className="shop shop-new">
        <ShoppableProducts products={products} loading={loading} />
      </div>
    </>
  )
}

export default NewProducts
