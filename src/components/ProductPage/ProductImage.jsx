import { Skeleton } from '@mui/material'
import React from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

function ProductImage({ product, images, loading }) {
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  return (
    <div className="product__images">
      {loading ? (
        <Skeleton variant="rectangular" height={320} animation="wave" />
      ) : (
        product?.product && (
          <Swiper
            allowTouchMove={true}
            loop={true}
            spaceBetween={10}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
            modules={[Navigation]}
            className="product__images__swiper"
          >
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
      <div className="nextArrow" ref={navigationPrevRef}>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.23157 1.1121L1.23157 1.11211L1.23333 1.11387L5.00667 4.88053L5.35991 4.52667L5.02087 4.89417C5.03779 4.90977 5.05129 4.92872 5.06053 4.9498C5.06976 4.97088 5.07453 4.99365 5.07453 5.01667C5.07453 5.03968 5.06976 5.06245 5.06053 5.08353C5.05129 5.10462 5.03779 5.12356 5.02087 5.13917L5.01364 5.14584L5.00667 5.1528L1.23333 8.91947L1.23331 8.91945L1.2295 8.92334C1.21406 8.93909 1.19565 8.95161 1.17534 8.9602C1.15567 8.96851 1.13459 8.97296 1.11324 8.97331C1.09189 8.97296 1.07081 8.96851 1.05114 8.9602C1.03083 8.95161 1.01242 8.93909 0.996982 8.92334L0.996991 8.92333L0.99451 8.92083C0.963469 8.88961 0.946045 8.84736 0.946045 8.80333C0.946045 8.75944 0.963356 8.71733 0.99421 8.68614C0.99431 8.68603 0.99441 8.68593 0.99451 8.68583L4.29346 5.38689L4.64524 5.03511L4.29523 4.68156L0.995232 1.34823L0.995233 1.34823L0.99451 1.3475C0.963469 1.31627 0.946045 1.27403 0.946045 1.23C0.946045 1.18597 0.963469 1.14373 0.99451 1.1125L0.994907 1.1121C1.0104 1.09648 1.02883 1.08408 1.04914 1.07562C1.06945 1.06716 1.09124 1.0628 1.11324 1.0628C1.13524 1.0628 1.15703 1.06716 1.17734 1.07562C1.19765 1.08408 1.21608 1.09648 1.23157 1.1121Z"
            fill="black"
            stroke="#4F4F4F"
          />
        </svg>
      </div>
      <div className="prevArrow" ref={navigationNextRef}>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.82023 8.91311L4.81709 8.91L1.04171 5.20085C0.98329 5.12085 0.966675 5.05249 0.966675 5C0.966675 4.94751 0.98329 4.87914 1.04171 4.79915L4.81709 1.09L4.8171 1.09001L4.82023 1.08689C4.85738 1.04974 4.87466 1.04176 4.87808 1.04024C4.87812 1.04022 4.87817 1.0402 4.87823 1.04017C4.88016 1.03928 4.89303 1.03333 4.93334 1.03333C4.97365 1.03333 4.98653 1.03928 4.98845 1.04017C4.98851 1.0402 4.98857 1.04022 4.98861 1.04024C4.99202 1.04176 5.00931 1.04974 5.04646 1.08689C5.08901 1.12944 5.10001 1.17011 5.10001 1.2C5.10001 1.22989 5.08901 1.27056 5.04646 1.31311L5.04644 1.31309L5.0429 1.3167L1.77623 4.65003L1.43327 5L1.77623 5.34996L5.0429 8.6833L5.04288 8.68331L5.04646 8.68689C5.08901 8.72944 5.10001 8.77011 5.10001 8.8C5.10001 8.82988 5.08901 8.87055 5.04646 8.91311C5.0039 8.95567 4.96323 8.96667 4.93334 8.96667C4.90346 8.96667 4.86279 8.95567 4.82023 8.91311Z"
            fill="black"
            stroke="#4F4F4F"
          />
        </svg>
      </div>
    </div>
  )
}

export default ProductImage
