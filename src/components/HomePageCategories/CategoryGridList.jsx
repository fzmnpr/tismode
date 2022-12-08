import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
function CategoryGridList({ mainCategories, isLoading }) {
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
        : mainCategories?.slice(0, 4).map((category) => (
            <Link to={navigateTo.categoryDetails(category.id)} key={category.id}>
              <div className="category__grid-list__item">
                <div className="category__grid-list__item__title">
                  <p>{category.name}</p>
                </div>
                <div className="category__grid-list__item__image">
                  <img src={category.image} alt={category.name} loading="lazy" />
                </div>
              </div>
            </Link>
          ))}
    </div>
  )
}

export default CategoryGridList
