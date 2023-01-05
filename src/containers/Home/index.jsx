import 'styles/index.scss'
import { Grid } from '@mui/material'
import SliderBanner from 'components/Banners/SliderBanner'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'

import CenterCustomBanners from 'components/CenterCustomBanners'
import { getCategories, getProducts } from 'state/actions'
import MobileAdsBanner from 'components/Banners/MobileAdsBanner'
import TopCustomBanner from 'components/TopCustomBanners/TopCustomBanners'
import { request } from 'utils/customAxiosInterceptor'
import NewProducts from 'components/NewProducts'
import RecommendedProducts from 'components/RecommendedProducts'

function Home() {
  const dispatch = useDispatch()
  const [customBanners, setCustomBanners] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getCustomBanners = async () => {
    try {
      const customBanners = await request.get('CustomBanner')
      setCustomBanners(customBanners?.data?.filter((banner) => banner.is_enabled))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useMemo(() => getCustomBanners(), [])
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])
  const { categories } = useSelector((state) => state.categories)
  const { products, loading } = useSelector((state) => state.products)
  const newestProducts = useMemo(() => {
    return products
      .sort((a, b) => {
        return a.create < b.create ? -1 : a.create > b.create ? 1 : 0
      })
      ?.splice(0, 10)
  }, [products])
  const recommendedProducts = useMemo(() => {
    return products.filter((product) => product.recommendation)
  }, [products])

  return (
    <div className="home page">
      <main>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <TopCustomBanner
              banners={customBanners.filter((banner) => banner.placement === 'Top')}
              isLoading={isLoading}
              categories={categories}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} className="main-banner">
            <SliderBanner />
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <CenterCustomBanners
              banners={customBanners.filter((banner) => banner.placement === 'Center')}
              isLoading={isLoading}
              categories={categories}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} className="container ">
            <NewProducts products={newestProducts} loading={loading} />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} className="container ">
            <MobileAdsBanner />
          </Grid>
          {recommendedProducts.length ? (
            <Grid item xs={12} sm={12} lg={6} className="container ">
              <RecommendedProducts products={recommendedProducts} loading={loading} />
            </Grid>
          ) : null}
        </Grid>
      </main>
    </div>
  )
}

export default Home
