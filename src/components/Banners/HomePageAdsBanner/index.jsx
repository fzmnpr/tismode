import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
import { request } from 'utils/customAxiosInterceptor'
import { Skeleton } from '@mui/material'

function MobileAdsBanner() {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const getBanner = async () => {
    const banner = await request.get('AdvertiseBanner')
    if (banner.data?.length) {
      setData(banner.data[0])
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getBanner()
  }, [])
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" height={200} sx={{ marginTop: '16px' }} />
      ) : (
        <Link to={navigateTo.productDetails(data?.product)}>
          <div className="banner">
            <div className="banner__image">
              <img src={data?.banner} alt={data?.name} title={data?.name} />
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export default MobileAdsBanner
