import React from 'react'
import SliderCarousel from 'components/shared/SliderCarousel'
import Skeleton from '@mui/material/Skeleton'
import { getGalleryImages } from 'services/advertisementServices'
import { useWindowSize } from 'hooks/useWindowSize'
const SliderBanner = React.memo(function SliderBanner() {
  const [loading, setLoading] = React.useState(true)
  const [response, setResponse] = React.useState([])
  const getGallery = async () => {
    const response = await getGalleryImages()
    if (response) setResponse(response?.data)
    setLoading(false)
  }
  React.useEffect(() => {
    getGallery()
  }, [])
  const [images, setImages] = React.useState([])
  const isSmall = useWindowSize().windowSize === 'sm'
  React.useEffect(() => {
    if (response) setImages(response)
  }, [response])
  return loading ? (
    <Skeleton
      variant="rectangular"
      height={isSmall ? 190 : 390}
      animation="wave"
      sx={{
        margin: '16px',
        marginTop: '0',
      }}
    />
  ) : (
    <div className="main-slider ">
      <SliderCarousel data={images} />
    </div>
  )
})

export default SliderBanner
