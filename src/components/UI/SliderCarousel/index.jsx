import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

function SliderCarousel({ data }) {
  return (
    <Swiper
      // showIndicators={false}
      // showThumbs={false}
      // // dynamicHeight={false}
      // showStatus={false}
      // showArrows={false}
      // infiniteLoop
      // useKeyboardArrows
      spaceBetween={12}
      allowTouchMove={true}
      centeredSlides={true}
      loop={true}
      modules={[Navigation]}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <Link to={`product/${item.product}`} key={item.id}>
            <div className="carousel-wrapper">
              <img src={item.image} alt={item.title} className="carousel-image" />
              <div className="carousel__caption">{item.name}</div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SliderCarousel
