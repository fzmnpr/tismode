import React, { useEffect, useState } from 'react'
import { getColors } from 'services/productManagementServices/productVariantServices'
import Select from 'react-select'
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
        isSearchable
        styles={styles}
      />
    </div>
  )
}
