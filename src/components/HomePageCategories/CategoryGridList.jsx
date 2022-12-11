import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
function CategoryGridList({ banners, isLoading, categories }) {
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
    <div className="category__grid-list container">
      {isLoading
        ? Array(4)
            .fill('')
            .map((item, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={100}
                width={170}
                animation="wave"
                className="category__grid-list__item"
              />
            ))
        : banners?.slice(0, 4).map((banner) => (
            <Link
              to={bannerLink(banner)}
              key={banner.id}
              onClick={() => {
                if (banner.type === 'Url') {
                  window.open(banner.hypertext, '_blank')
                }
              }}
            >
              <div className="category__grid-list__item">
                <div className="category__grid-list__item__title">
                  <p>{banner.name}</p>
                </div>
                <div className="category__grid-list__item__image">
                  <img src={banner.center_banner} alt={banner.name} loading="lazy" />
                </div>
              </div>
            </Link>
          ))}
    </div>
  )
}

export default CategoryGridList
