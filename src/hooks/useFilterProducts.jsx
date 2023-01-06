import { request } from 'utils/customAxiosInterceptor'
import { useEffect, useState } from 'react'

/**
 * 
 * @param {string} url 
 * @param {string} uniqueId uniqueId is the id we get from useParams() if we are in a specific category and params is the possible data we might need to get the products list
 * @param {*} params 
 * @returns  products: any[];
    isLoading: boolean;
    setActiveFilter: React.Dispatch<React.SetStateAction<number>>;
    activeFilter: number;
 */
export const useFilterProducts = (url, uniqueId, params) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [originalProducts, setOriginalProducts] = useState([])
  const [activeFilter, setActiveFilter] = useState(1)
  const filteredProducts = (filter) => {
    switch (filter) {
      case 2:
        return products.sort((a, b) => (a.create > b.create ? -1 : a.create < b.create ? 1 : 0))
      case 3:
        return products.sort((a, b) => a.total_price - b.total_price)
      case 1:
        return originalProducts
    }
  }
  async function getDataList() {
    const productList = await request.get(url, params && params)
    if (uniqueId) {
      // const categoryProducts = productList.data.filter((item) => item.category === parseInt(uniqueId))
      let categoryProducts = []
      productList.data.forEach((item) => {
        const itemCategories = item.category.map((category) => category.id)
        if (itemCategories.includes(parseInt(uniqueId))) {
          categoryProducts = [...categoryProducts, item]
        }
      })
      setProducts([...categoryProducts])
      setOriginalProducts([...categoryProducts])
      setIsLoading(false)
      return
    }
    setProducts(productList.data)
    setOriginalProducts([...productList.data])
    setIsLoading(false)
  }
  useEffect(() => {
    getDataList()
  }, [])

  useEffect(() => {
    const filtered = filteredProducts(activeFilter)
    setProducts([...filtered])
  }, [activeFilter])
  return {
    products,
    isLoading,
    setActiveFilter,
    activeFilter,
  }
}
