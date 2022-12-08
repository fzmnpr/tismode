import SearchResultsDropDown from 'components/SearchResults/SearchResultsDropDown'

function SearchResults({ searchValue, results, isOpen, setIsOpen }) {
  return (
    <div className="search-results">
      {isOpen && (
        <SearchResultsDropDown searchValue={searchValue} results={results} setIsOpen={setIsOpen} isOpen={isOpen} />
      )}
    </div>
  )
}

export default SearchResults
