import SearchResultsDropDown from 'components/shared/SearchResults/SearchResultsDropDown'

function SearchResults({ searchValue, results, closeDropdown }) {
  return (
    <div className="search-results">
      <SearchResultsDropDown searchValue={searchValue} results={results} closeDropdown={closeDropdown} />
    </div>
  )
}

export default SearchResults
