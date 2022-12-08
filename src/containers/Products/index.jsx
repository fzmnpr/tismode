import { Skeleton } from '@mui/material'
import Breadcrumb from 'components/BreadCrumbs'
import ProductsFilters from 'components/ProductsFilter'
import ProductCard from 'components/shared/ProductCard'
import NotFound from 'containers/NotFound'
import { useFilterProducts } from '../../hooks/useFilterProducts'
import { useParams } from 'react-router-dom'
function Products() {
  const { productCategoryId, productCategoryName } = useParams()
  const { products, isLoading, setActiveFilter, activeFilter } = useFilterProducts('Product', productCategoryId)

  return (
    <div className="products page container">
      <Breadcrumb crumbs={[{ name: productCategoryName, link: '' }]} isLoading={isLoading} />
      {isLoading ? (
        <>
          {new Array(3).fill(true).map((item, index) => (
            <Skeleton
              variant="rectangular"
              height={30}
              width={52}
              sx={{
                marginTop: '16px',
                display: 'inline-block',
                marginLeft: '5px',
              }}
              animation="wave"
              key={index}
            />
          ))}
          {new Array(3).fill(true).map((item, index) => (
            <Skeleton
              variant="rectangular"
              height={150}
              sx={{ width: '100%', marginTop: '16px' }}
              animation="wave"
              key={index}
            />
          ))}
        </>
      ) : (
        <>
          {products.length ? <ProductsFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} /> : null}
          {products.length ? (
            <div className="products__list">
              {products.map((product) => (
                <ProductCard product={product} isLoading={isLoading} key={product.id} />
              ))}
            </div>
          ) : productCategoryId ? (
            <div className="products__not-found">متاسفانه محصولی در این دسته بندی یافت نشد</div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </div>
  )
}

export default Products
