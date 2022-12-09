import React from 'react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'

function SubCategories({ selectedCategory, categories }) {
  const [subCategories, setSubCategories] = React.useState([])
  useMemo(() => {
    setSubCategories(categories.filter((sub) => sub.sub_category === selectedCategory.id))
  }, [selectedCategory, categories])
  return (
    <div className="subcategory">
      <div className="subcategory__list">
        {subCategories.map((subCategory) => (
          <Link
            to={navigateTo.ProductCategory(subCategory.id, subCategory.name)}
            className="subcategory__item"
            key={subCategory.id}
          >
            <div className="subcategory__item__image">
              <img src={decodeURIComponent(subCategory.image)} alt="" loading="lazy" />
            </div>
            <div className="subcategory__item__name">
              <span>{subCategory.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SubCategories
