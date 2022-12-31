import { navigateTo } from 'Routes'
import { Link } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

function SliderCarousel({ data, disableAutoplay, disableLoop }) {
  return (
    <Swiper
      spaceBetween={12}
      allowTouchMove={true}
      centeredSlides={true}
      loop={!disableLoop}
      modules={[Pagination, Autoplay]}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={
        !disableAutoplay
          ? {
              delay: 2500,
              disableOnInteraction: false,
            }
          : false
      }
    >
      {data.map((item) => (
        <SwiperSlide key={item.id} className="carousel-wrapper">
          <Link to={navigateTo.productDetails(item.id)} key={item.id}>
            <img src={item.image || item.banner} alt={item.title} className="carousel-image" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SliderCarousel
