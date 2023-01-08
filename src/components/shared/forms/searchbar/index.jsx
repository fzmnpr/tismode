import { debounce, InputAdornment, TextField } from '@mui/material'
import SearchResults from 'containers/SearchResults'
import { usePrevious } from 'hooks/usePrevious'
import React, { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { request } from 'utils/customAxiosInterceptor'
import searchIcon from 'assets/icons/search-normal.svg'

function SearchBar() {
  const [searchValue, setSearchValue] = React.useState('')
  const [results, setResults] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false)
  const prevSearchValue = usePrevious(searchValue)
  const navigate = useNavigate()

  const returnedFunction = debounce(async function () {
    const result = await request.get(`Product?name__contains=${searchValue}`)
    setResults(result.data)
    setIsOpen(true)
  }, 250)
  const closeDropdown = () => {
    if (!isOpen) return
    setIsOpen(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      closeDropdown()
    }
    if (e.key === 'Enter') {
      const params = { search: searchValue }
      navigate({
        pathname: '/search',
        search: `?${createSearchParams(params)}`,
      })
      closeDropdown()
    }
  }
  useEffect(() => {
    if (searchValue && prevSearchValue !== searchValue) {
      returnedFunction()
    }
    if (searchValue.length) {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [searchValue])

  return (
    <>
      <div className="desktop-search-bar">
        <TextField
          placeholder="جستجو"
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={() => {
                  const params = { search: searchValue }
                  navigate({
                    pathname: '/search',
                    search: `?${createSearchParams(params)}`,
                  })
                  closeDropdown()
                }}
              >
                <img src={searchIcon} alt="search" />
              </InputAdornment>
            ),
          }}
          className="inputfield"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && <SearchResults searchValue={searchValue} results={results} closeDropdown={closeDropdown} />}
    </>
  )
}

export default SearchBar
