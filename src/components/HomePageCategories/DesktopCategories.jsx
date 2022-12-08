import Skeleton from '@mui/material/Skeleton'
import ArrowIcon from 'assets/icons/arrow-white.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'

function DesktopCategories() {
  const { categories, loading } = useSelector((state) => state.categories)

  const loadingArray = new Array(6).fill(true)

  return (
    <div className="categories display-none">
      <div className="categories__header section-header">
        <h3>دسته بندی محصولات</h3>
      </div>
      <div className="categories__body">
        {loading
          ? loadingArray.map((item, index) => (
              <div key={index} style={{ display: 'inline-block' }}>
                <Skeleton variant="rectangular" height={184} animation="wave" />
              </div>
            ))
          : categories.slice(0, 6).map((category, index) => {
              return (
                !category.sub_cat && (
                  <Link to={navigateTo.categoryDetails(category.id)}>
                    <div className="categories__item" key={index}>
                      <div className="categories__item__image">
                        <img src={category.image} alt={category.name} />
                        <div className="overlay"></div>
                      </div>
                      <div className="categories__item__caption">
                        <h3>{category.name}</h3>
                        <div className="link-empty">
                          <p>مشاهده</p>
                          <img src={ArrowIcon} />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )
            })}
      </div>
    </div>
  )
}

export default DesktopCategories
