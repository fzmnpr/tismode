import React, { useMemo } from 'react'
import { useEffect } from 'react'
import SubCategories from 'components/SubCategories'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from 'state/actions'
import AnimatedLoading from 'components/UI/AnimatedLoading'
function CategoryPage() {
  const { categoryId } = useParams()
  const [crumbs, setCrumbs] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState({
    name: '',
    id: parseInt(categoryId),
  })
  const [mainCategories, setMainCategories] = React.useState([])

  const dispatch = useDispatch()
  const { categories, loading } = useSelector((state) => state.categories)
  useMemo(() => {
    setMainCategories(categories.filter((category) => !category.sub_cat))
    setCrumbs([
      {
        name: categories.find((category) => category.id === selectedCategory.id)?.name,
        link: '',
      },
    ])
  }, [categories, selectedCategory])

  useEffect(() => {
    if (!categories?.length) {
      dispatch(getCategories())
    }
  }, [dispatch])
  useEffect(() => {
    if (!categoryId) {
      setSelectedCategory({
        name: categories?.[0]?.name,
        id: categories?.[0]?.id,
      })
    }
  }, [categoryId, categories])
  if (loading) {
    return <AnimatedLoading isFullPage={true} background={'#F8043F'} />
  }
  return (
    <>
      <div className="category__page container page">
        {loading ? null : (
          <div className="category__container">
            <div className="category__main-cats">
              {mainCategories.slice(0, 2).map((category, index) => (
                <div
                  className={`category__main-item ${
                    selectedCategory.id === category.id ? `category__main-item--selected-${index}` : ''
                  }`}
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory({
                      id: category.id,
                      name: category.name,
                    })
                  }
                >
                  <div className="category__main-item__name">{category.name}</div>
                </div>
              ))}
            </div>

            <SubCategories selectedCategory={selectedCategory} categories={categories} />
          </div>
        )}
      </div>
    </>
  )
}

export default CategoryPage
