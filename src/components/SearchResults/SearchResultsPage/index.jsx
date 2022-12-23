import ProductCard from 'components/shared/ProductCard'
import { request } from 'utils/customAxiosInterceptor'
import React, { useEffect } from 'react'
import { Skeleton } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const params = searchParams.get('search')

  const searchValue = decodeURIComponent(params)
  const [results, setResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const getResults = async () => {
    setLoading(true)
    const result = await request.get(`Product?search=${searchValue}`)
    setResults(result.data)
    setLoading(false)
  }
  useEffect(() => {
    getResults()
  }, [params])

  return (
    <div className="container search-results__page">
      <div className="row">
        <div className="col-12">
          <div className="search-results__page-header">
            <h1 className="search-results__page-header-title">نتایج جست و جو</h1>
            <p className="search-results__page-header-subtitle">جست و جو برای: {searchValue}</p>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="search-results__page__results">
          <div className="col-12">
            <div className="product__grid">
              {Array(12)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    count={3}
                    variant="rectangular"
                    height={284}
                    width={200}
                    animation="wave"
                    style={{ marginBottom: '1rem', marginRight: '1rem' }}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : null}
      {!loading ? (
        results.length ? (
          <div className="search-results__page__results">
            {results.map((result, index) => (
              <ProductCard product={result} key={result.id} />
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="search-results__page-no-results">
                <h2 className="search-results__page-no-results-title">نتیجه ای یافت نشد</h2>
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  )
}

export default SearchResultsPage
