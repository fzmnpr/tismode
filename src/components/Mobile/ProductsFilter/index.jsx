const filters = [
  {
    name: 'پیشفرض',
    id: 1,
    engName: 'default',
  },
  {
    name: 'جدیدترین',
    id: 2,
    engName: 'newest',
  },
  {
    name: 'ارزانترین',
    id: 3,
    engName: 'Price:descending',
  },
]
const ProductsFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="products__filter">
      {filters.map((filter) => (
        <div
          key={filter.id}
          className={`products__filter__item ${activeFilter === filter.id && 'products__filter__item--active'}`}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.name}
        </div>
      ))}
    </div>
  )
}

export default ProductsFilters
