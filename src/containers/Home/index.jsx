import 'styles/index.scss'
import { Grid } from '@mui/material'
import SliderBanner from 'components/Banners/SliderBanner'
import Categories from 'components/HomePageCategories'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import CategoryGridList from 'components/HomePageCategories/CategoryGridList'
import { getCategories } from 'state/actions'
import MobileAdsBanner from 'components/Banners/HomePageAdsBanner'
function Home({ size }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  const { categories, loading } = useSelector((state) => state.categories)
  const mainCategories = categories.filter((category) => !category.sub_cat)
  return (
    <div className="home page">
      <main>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Categories size={size} mainCategories={mainCategories} AllCategories={categories} isLoading={loading} />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} className="main-banner">
            <SliderBanner />
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <CategoryGridList mainCategories={mainCategories} isLoading={loading} />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} className="container">
            <MobileAdsBanner />
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default Home
