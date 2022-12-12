import 'styles/index.scss'
import { Grid } from '@mui/material'
import SliderBanner from 'components/Banners/SliderBanner'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import CategoryGridList from 'components/HomePageCategories/CategoryGridList'
import { getCategories } from 'state/actions'
import MobileAdsBanner from 'components/Banners/HomePageAdsBanner'
import TopCustomBanner from 'components/TopCustomBanners/TopCustomBanners'
import { request } from 'utils/customAxiosInterceptor'
import { convertToEnglish, convertToPersian } from 'utils/convertNumbers'

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
  }, [dispatch])
  const { categories } = useSelector((state) => state.categories)
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
            <CategoryGridList
              banners={customBanners.filter((banner) => banner.placement === 'Center')}
              isLoading={isLoading}
              categories={categories}
            />
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
