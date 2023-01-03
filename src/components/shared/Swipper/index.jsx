import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Grid, Navigation } from 'swiper'
import ArrowLeftIcon from 'assets/icons/Vector.png'
import { Skeleton } from '@mui/material'

function Swipper({ loading, title, ...props }) {
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  return (
    <div className="swiper-wrapper">
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
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {loading
          ? new Array(4).fill(true).map((item, index) => (
              <SwiperSlide key={index}>
                <Skeleton variant="rectangular" height={184} animation="wave" />
              </SwiperSlide>
            ))
          : props.children}
      </Swiper>
      {props.children.length ? (
        <>
          <div className="nextArrow" ref={navigationNextRef}>
            <img src={ArrowLeftIcon} className="carousel-arrow" alt="next" />
          </div>
          <div className="prevArrow" ref={navigationPrevRef}>
            <img src={ArrowLeftIcon} className="carousel-arrow" alt="prev" />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Swipper
