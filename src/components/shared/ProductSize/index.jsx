import { productVariantPickerStyles } from 'components/UI/ReactSelectStyles'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { getSizes } from 'services/productManagementServices/productVariantServices'

function ProductSize({ sizeList, setSelectedSize, selectedSize }) {
  const [options, setOptions] = useState([])
  const loadOptions = async () => {
    const res = await getSizes()
    const results = await res.data
    if (!results) return []
    const options = results
      .filter((size) => sizeList.includes(size.id))
      .map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    setOptions(options)
  }
  useEffect(() => {
    loadOptions()
  }, [sizeList])

  return (
    <div className="sizes">
      <Select
        initialValue={selectedSize}
        value={selectedSize}
        openMenuOnClick
        placeholder="انتخاب سایز"
        options={options}
        onChange={(value) => setSelectedSize(value)}
        isSearchable={false}
        styles={productVariantPickerStyles}
      />
    </div>
  )
}

export default ProductSize
