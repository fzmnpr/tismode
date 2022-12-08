import DesktopCategories from './DesktopCategories'
import SwiperCategoryList from './SwiperCategoryList'
function Categories({ size, mainCategories, allCategories, isLoading }) {
  return (
    <>
      {size === 'lg' ? (
        <DesktopCategories mainCategories={mainCategories} AllCategories={allCategories} isLoading={isLoading} />
      ) : (
        <SwiperCategoryList mainCategories={mainCategories} isLoading={isLoading} />
      )}
    </>
  )
}

export default Categories
