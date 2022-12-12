import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { getSizes } from 'services/productManagementServices/productVariantServices'
const styles = {
  control: (base, state) => ({
    ...base,
    width: '100% ',
    fontSize: '14px',
    zIndex: 999,
    background: '#E0E0E0',
    borderRadius: '8px',
    color: '#000',
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#000',
    }
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: '#292D32',
    },
  }),
}
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
        styles={styles}
      />
    </div>
  )
}

export default ProductSize
