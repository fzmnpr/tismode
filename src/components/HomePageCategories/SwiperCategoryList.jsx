import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
import { FreeMode, Grid } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import categoryImage from 'assets/images/SDFSDF 1.png'
function SwiperCategoryList({ mainCategories, isLoading }) {
  return (
    <div className="swiper__categories">
      <Swiper
        slidesPerView={4}
        modules={[FreeMode, Grid]}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        followFinger={true}
        allowTouchMove={true}
        loop={true}
        loopedSlides={4}
        centeredSlides={false}
        // spaceBetween={12}
      >
        {isLoading
          ? new Array(5).fill(true).map((item, index) => (
              <SwiperSlide key={index}>
                <Skeleton variant="circular" height={70} width={75} animation="wave" sx={{ marginLeft: '10px' }} />
              </SwiperSlide>
            ))
          : mainCategories.map((category, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link to={navigateTo.categoryDetails(category.id)}>
                    <div
                      className={`swiper__categories__item ${
                        index % 2 === 0 ? 'swiper__categories__item--red' : 'swiper__categories__item--blue'
                      }`}
                    >
                      {category.image_mobile ? (
                        <img src={category.image_mobile} alt={category.name} />
                      ) : (
                        <img src={categoryImage} alt={category.name} />
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
      </Swiper>
    </div>
  )
}

export default SwiperCategoryList
