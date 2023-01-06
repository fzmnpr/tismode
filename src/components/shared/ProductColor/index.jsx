import React, { useEffect, useState } from 'react'
import { getColors } from 'services/productManagementServices/productVariantServices'
import Select from 'react-select'
import { productVariantPickerStyles } from 'components/UI/ReactSelectStyles'

export function ProductColor({ setSelectedColor, selectedColor, colorList }) {
  const [options, setOptions] = useState([])
  const getColorList = async () => {
    try {
      const res = await getColors()
      const results = await res.data
      if (!results) return []
      const options = results
        .filter((size) => colorList.includes(size.id))
        .map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      setOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getColorList()
  }, [colorList])
  return (
    <div className="colors">
      <Select
        initialValue={selectedColor}
        value={selectedColor}
        openMenuOnClick
        placeholder="انتخاب رنگ"
        options={options}
        onChange={(value) => setSelectedColor(value)}
        isSearchable={false}
        styles={productVariantPickerStyles}
      />
    </div>
  )
}
