import { Autocomplete, Box, TextField } from '@mui/material'
import React from 'react'

function CustomAutoComplete({ options, onChange, isLoading, value }) {
  return (
    <Autocomplete
      id="province-select"
      freeSolo
      sx={{ width: '100%', border: 'none' }}
      options={options}
      autoHighlight
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label}
        </Box>
      )}
      value={value || ''}
      disableClearable
      blurOnSelect
      clearOnEscape
      disableListWrap
      loading={isLoading}
      loadingText={'در حال جستجو'}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            type: 'search',
          }}
        />
      )}
      onChange={onChange}
    />
  )
}

export default CustomAutoComplete
