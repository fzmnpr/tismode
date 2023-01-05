import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getCityList, getProvinceList } from 'services/cityProvinceServices'
import { ErrorMessage } from '@hookform/error-message'
import { Autocomplete, Box, TextField } from '@mui/material'
import { request } from 'utils/customAxiosInterceptor'

function AddressForm({ setOpenForm, setSelectedAddress, user, selectedAddress }) {
  const [provinceList, setProvinceList] = React.useState([])
  const [selectedProvince, setSelectedProvince] = React.useState('')
  const [cityList, setCityList] = React.useState([])
  const [selectedCity, setSelectedCity] = React.useState('')
  const [provinceError, setProvinceError] = React.useState(null)
  const [cityError, setCityError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [citiesLoading, setCitiesLoading] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    ...setValue
  } = useForm()
  const getAllProvince = async () => {
    setIsLoading(true)
    try {
      const response = await getProvinceList()
      setProvinceList(
        response.data.map((province) => {
          return {
            value: province.id,
            label: province.name,
          }
        }),
      )
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getProvinceCities = async () => {
    setCitiesLoading(true)
    try {
      const response = await getCityList(selectedProvince.label)
      setCityList(
        response.data.cities.map((province) => {
          return {
            value: province.id,
            label: province.name,
          }
        }),
      )
      setCitiesLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const submitUserAddress = async (data) => {
    if (!selectedCity || !selectedProvince) return
    const userData = {
      f_name: data.f_name,
      l_name: data.l_name,
      address: `${selectedProvince.label}, ${selectedCity.label}, ${data.address}`,
      // code: data.code,
      user: user.id,
      receiver_phone: data.receiver_phone,
      city: selectedCity.label,
      province: selectedProvince.label,
    }
    setSelectedAddress(userData)
    localStorage.setItem('address', JSON.stringify(userData))
    const sendAddress = request.post('Addresslist', userData)
    if (sendAddress) {
      console.log('success')
    }
    setOpenForm(false)
  }
  useEffect(() => {
    getAllProvince()
  }, [])

  useEffect(() => {
    if (selectedProvince) getProvinceCities()
  }, [selectedProvince])

  return (
    <div className="checkout__form">
      <div className="checkout__form__content">
        <form onSubmit={handleSubmit((data) => submitUserAddress(data))}>
          <div className="checkout__form__content__item">
            <div className="label">نام</div>
            <input {...register('f_name', { required: 'این فیلد اجباریست' })} id="f_name" />
            <p className="error-message">
              <ErrorMessage errors={errors} name="f_name" />
            </p>
          </div>
          <div className="checkout__form__content__item">
            <div className="label">نام خانوادگی</div>
            <input {...register('l_name', { required: 'این فیلد اجباریست' })} id="l_name" />
            <p className="error-message">
              <ErrorMessage errors={errors} name="l_name" />
            </p>
          </div>
          <div className="checkout__form__content__item">
            <div className="label">استان</div>
            <Autocomplete
              id="province-select"
              freeSolo
              sx={{ width: '100%', border: 'none' }}
              options={provinceList}
              autoHighlight
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.label}
                </Box>
              )}
              value={selectedProvince || ''}
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
              onChange={(e, value) => {
                setSelectedCity(null)
                setSelectedProvince(value)
                setProvinceError(null)
              }}
            />
            {provinceError && <p className="error-message">{cityError}</p>}
          </div>

          <div className="checkout__form__content__item">
            <div className="label">شهر</div>
            <Autocomplete
              id="city-select"
              freeSolo
              sx={{ width: '100%', border: 'none' }}
              options={cityList}
              value={selectedCity || ''}
              autoHighlight
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.label}
                </Box>
              )}
              disableClearable
              blurOnSelect
              clearOnEscape
              disableListWrap
              loading={citiesLoading}
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
              onChange={(e, value) => {
                setSelectedCity(value)
                setCityError(null)
              }}
            />
            {cityError && <p className="error-message">{cityError}</p>}
          </div>
          <div className="checkout__form__content__item checkout__form__content__item--phone-number">
            <div className="label">شماره تلفن </div>
            <input
              {...register('receiver_phone', {
                required: 'این فیلد اجباریست',
              })}
            />
            <p className="error-message">
              <ErrorMessage errors={errors} name="receiver_phone" />
            </p>
          </div>
          <div className="checkout__form__content__item">
            <div className="label">آدرس </div>
            <textarea {...register('address', { required: 'این فیلد اجباریست' })} id="address" />
            <p className="error-message">
              <ErrorMessage errors={errors} name="address" />
            </p>
          </div>

          <div className="checkout__form__content__item postal-code">
            <div className="label">کد پستی</div>
            <input {...register('code', { required: 'این فیلد اجباریست' })} id="code" />
            <p className="error-message">
              <ErrorMessage errors={errors} name="code" />{' '}
            </p>
          </div>
          <div className="checkout__form__content__buttons">
            <button
              onClick={() => {
                if (typeof selectedProvince === 'string') {
                  setProvinceError('لطفا استان را انتخاب کنید')
                }

                if (typeof selectedCity === 'string') {
                  setCityError('لطفا شهر را انتخاب کنید')
                }
              }}
              type="submit"
              className="checkout__form__content__submit-btn"
            >
              ثبت اطلاعات
            </button>
            <button className="checkout__form__content__cancel-btn" onClick={() => setOpenForm(false)}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddressForm
