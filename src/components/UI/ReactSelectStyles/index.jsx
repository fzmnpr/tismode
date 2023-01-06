export const productVariantPickerStyles = {
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
    padding: '0',
  }),
}
