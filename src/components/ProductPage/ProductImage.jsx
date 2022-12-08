import { Skeleton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'

function ProductImage({ product, images, loading }) {
  return (
    <div className="product__images">
      {loading ? (
        <Skeleton variant="rectangular" height={320} animation="wave" />
      ) : (
        product?.product && (
          <Swiper allowTouchMove={true} loop={true} spaceBetween={10} className="product__images__swiper">
            <SwiperSlide className="product__image__wrapper">
              <img src={product.product.image} alt="" className="product__image" />
            </SwiperSlide>
            {images.map((image) => (
              <SwiperSlide key={image} className="product__image__wrapper">
                <img src={image} alt="" className="product__image" />
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}
    </div>
  )
}

export default ProductImage
