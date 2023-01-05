import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
import { FreeMode, Grid } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
function TopCustomBanner({ banners, isLoading, categories }) {
  const bannerLink = (banner) => {
    switch (banner.type) {
      case 'Category':
        const categoryName = categories.find((cat) => cat.id === banner.category)?.name
        return navigateTo.ProductCategory(banner.category, categoryName)
      case 'Product':
        return navigateTo.productDetails(banner.product)
      case 'Hashtag':
        return navigateTo.ProductListByHashtag(banner.hashtag_name)
      default:
        break
    }
  }
  return (
    <div className="swiper__categories">
      <Swiper
        // slidesPerView={auto}
        slidesPerView={'auto'}
        modules={[FreeMode, Grid]}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        followFinger={true}
        allowTouchMove={true}
        loop={true}
        loopedSlides={120}
        centeredSlides={false}
        // spaceBetween={12}
        // loopedSlides={12}
      >
        {isLoading
          ? new Array(5).fill(true).map((item, index) => (
              <SwiperSlide key={index}>
                <Skeleton variant="circular" height={70} width={75} animation="wave" sx={{ marginLeft: '10px' }} />
              </SwiperSlide>
            ))
          : banners.map((banner, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => {
                    if (banner.type === 'Url') {
                      window.open(banner.hypertext, '_blank')
                    }
                  }}
                >
                  <Link to={bannerLink(banner)}>
                    <div
                      className={`swiper__categories__item ${
                        index % 2 === 0 ? 'swiper__categories__item--red' : 'swiper__categories__item--blue'
                      }`}
                    >
                      <img src={banner.top_banner} alt={banner.name} loading="lazy" />
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
      </Swiper>
    </div>
  )
}

export default TopCustomBanner
