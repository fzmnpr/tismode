import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'
import { request } from 'utils/customAxiosInterceptor'
import { Skeleton } from '@mui/material'
import SliderCarousel from 'components/shared/SliderCarousel'

const MobileAdsBanner = memo(function MobileAdsBanner() {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const getBanner = async () => {
    const banner = await request.get('AdvertiseBanner')
    if (banner.data?.length) {
      setData(banner.data)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getBanner()
  }, [])
  return (
    <div className="MobileAdsBanner">
      {isLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <SliderCarousel data={data} disableAutoplay={true} disableLoop={true} />
      )}
    </div>
  )
})

export default MobileAdsBanner
