import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import ArrowLeftIcon from 'assets/icons/arrow-left.svg'
import { Skeleton } from '@mui/material'

function Swipper({ loading, title, ...props }) {
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  return (
    <div className="slide-wrapper margin-section">
      <div className=" section-header">
        <h3>{title}</h3>
      </div>
      <Swiper
        spaceBetween={props.spaceBetween || 24}
        allowTouchMove={true}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          400: {
            slidesPerView: props.slidesPerView || 4,
            loop: true,
          },
          880: {
            slidesPerView: props.slidesPerView || 4,
            loop: false,
          },
          1110: {
            slidesPerView: props.slidesPerView || 4,
            centeredSlides: false,
            loop: false,
          },
        }}
        slidesPerView={4}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
        }}
        modules={[Navigation]}
        // onSwiper={(swiper) => console.log(swiper)}
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
    </div>
  )
}

export default Swipper
