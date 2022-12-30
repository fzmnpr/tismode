import { Link } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

function SliderCarousel({ data }) {
  //TODO: add autoplay spped
  return (
    <Swiper
      spaceBetween={12}
      allowTouchMove={true}
      centeredSlides={true}
      loop={true}
      modules={[Pagination, Autoplay]}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id} className="carousel-wrapper">
          <Link to={`product/${item.product}`} key={item.id}>
            <img src={item.image} alt={item.title} className="carousel-image" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SliderCarousel
