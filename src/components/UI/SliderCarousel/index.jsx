import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Link } from 'react-router-dom'

function SliderCarousel({ data }) {
  return (
    <Carousel
      showIndicators={false}
      showThumbs={false}
      dynamicHeight={false}
      showStatus={false}
      showArrows={false}
      infiniteLoop
      useKeyboardArrows
    >
      {data.map((item) => (
        <Link to={`product/${item.product}`}>
          <div className="carousel-wrapper" key={item.id}>
            <img src={item.image} width={24} height={24} alt={item.title} loading="lazy" />
            <div className="carousel__caption" style={{ maxWidth: '350px' }}>
              <p>{item.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  )
}

export default SliderCarousel
