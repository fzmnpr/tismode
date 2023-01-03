import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Grid, Navigation } from 'swiper'
import ArrowLeftIcon from 'assets/icons/arrow-left.svg'
import { Skeleton } from '@mui/material'

function Swipper({ loading, title, ...props }) {
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  return (
    <Swiper
      spaceBetween={props.spaceBetween || 24}
      allowTouchMove={true}
      // loopedSlides={120}
      centeredSlides={false}
      loop={true}
      slidesPerView={2}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = navigationPrevRef.current
        swiper.params.navigation.nextEl = navigationNextRef.current
      }}
      modules={[Navigation]}
    >
      {loading
        ? new Array(4).fill(true).map((item, index) => (
            <SwiperSlide key={index}>
              <Skeleton variant="rectangular" height={184} animation="wave" />
            </SwiperSlide>
          ))
        : props.children}
      <div className="nextArrow">
        <img src={ArrowLeftIcon} className="carousel-arrow" ref={navigationPrevRef} alt="next" />
      </div>
      <div className="prevArrow">
        <img src={ArrowLeftIcon} className="carousel-arrow" ref={navigationNextRef} alt="prev" />
      </div>
    </Swiper>
  )
}

export default Swipper
