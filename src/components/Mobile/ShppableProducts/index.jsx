import ShoppableProduct from 'components/Mobile/ShoppableProduct'
import Swipper from 'components/shared/Swipper'
import React from 'react'
import { SwiperSlide } from 'swiper/react'

function ShoppableProducts({ products, loading }) {
  return (
    <Swipper spaceBetween={24} loading={loading}>
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ShoppableProduct product={product} />
        </SwiperSlide>
      ))}
    </Swipper>
  )
}

export default ShoppableProducts
