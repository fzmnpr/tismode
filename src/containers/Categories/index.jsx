import { Skeleton } from '@mui/material'
import SliderBanner from 'components/Banners/SliderBanner'
import React, { useState, useEffect } from 'react'
import { request } from 'utils/customAxiosInterceptor'
import LayersIcon from '@mui/icons-material/Layers'
function Categories() {
  const [loading, setLoading] = React.useState(false)
  const [categories, setCategories] = useState([])
  const [suggestedCategories, setSuggestedCategories] = useState([])

  const getCategories = async () => {
    setLoading(true)
    const response = await request.get(`Category`)
    const data = await response.data
    if (data) setCategories(data)
    setLoading(false)
  }
  const getSuggestedCategory = async (id) => {
    let _id = id
    if (!id) {
      const withSubCat = categories.find((category) => category.sub_cat === true)
      _id = withSubCat?.id
    }
    if (!_id) return
    const response = await request.get(`Category`)
    const subs = response?.data?.filter((item) => item.sub_category === _id)
    if (subs) {
      setSuggestedCategories(subs)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  useEffect(() => {
    getSuggestedCategory()
  }, [categories])
  return (
    <div className="category container page">
      <SliderBanner />
      <div className="section-header">
        <h3>خرید بر اساس دسته بندی</h3>
      </div>
      <div className="category__list">
        {loading ? (
          <div className="category__list__items">
            {Array(4)
              .fill(true)
              .map((item, index) => (
                <div className="category__list__item" key={index}>
                  <Skeleton variant="rectangular" height={184} width={184} animation="wave" />
                </div>
              ))}
          </div>
        ) : (
          <div className="category__list__items">
            {categories.map((item, index) =>
              !item.sub_cat ? (
                <div className="category__list__item" key={item.id} onClick={() => getSuggestedCategory(item.id)}>
                  <div className="category__list__item__image-wrapper">
                    {item.image_mobile ? (
                      <img src={item.image_mobile} alt={item.name} />
                    ) : (
                      <LayersIcon fontSize="large" />
                    )}
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ) : null,
            )}
          </div>
        )}
      </div>
      <div className="section-header">
        <h3> دسته بندی پیشنهادی</h3>
      </div>
      <div className="category__list suggestedCategories">
        <div className="category__page__subCategories  suggestedCategories">
          {suggestedCategories?.length
            ? suggestedCategories.map((item, index) => (
                <div className="category__page__subCategories__item  suggestedCategories__item" key={item.id}>
                  <div className="category__page__subCategories__item__image-wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default Categories
