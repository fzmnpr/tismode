import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { navigateTo } from 'Routes'

function SearchResultsDropDown({ searchValue, results, closeDropdown }) {
  const ref = useRef()
  const onOutSideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      closeDropdown()
    }
  }
  useEffect(() => {
    window.addEventListener('click', onOutSideClick)
    return () => window.removeEventListener('click', onOutSideClick)
  }, [])
  return (
    <>
      {searchValue && results.length > 0 ? (
        <div className="search-results__dropdown" ref={ref}>
          <div className="search-results__dropdown__header">
            <span>نتایج جست و جو شده برای:</span>
            <span>{searchValue}</span>
          </div>
          <div className="search-results__dropdown__body">
            {results.map((result, index) => {
              return (
                <Link to={navigateTo.productDetails(result.id, result.name)} key={index} onClick={closeDropdown}>
                  <div key={index} className="search-results__dropdown__item">
                    <span className="search-results__dropdown__item__image">
                      <img src={result.image} alt="product-img" />
                    </span>
                    <div className="search-results__dropdown__item__caption">
                      <span>{result.name}</span>
                      <div className="search-results__dropdown__item__prices">
                        <p className={'product-price ' + (result?.discount ? 'discounted' : '')}>
                          {result?.discount ? result?.total_price : result?.unit_price} تومان
                        </p>
                        {result?.discount ? (
                          <s className="product__price-discount">{result?.unit_price} تومان</s>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : searchValue && results.length === 0 ? (
        <div className="search-results__dropdown">
          <div className="search-results__dropdown__header">
            <p>نتیجه ای یافت نشد</p>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SearchResultsDropDown
