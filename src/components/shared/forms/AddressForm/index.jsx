import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getCityList, getProvinceList } from 'services/cityProvinceServices'
import { ErrorMessage } from '@hookform/error-message'
import { request } from 'utils/customAxiosInterceptor'
import CustomAutoComplete from 'components/UI/CustomAutoComplete'
import { usePrevious } from 'hooks/usePrevious'
import { AddressFields } from './AddressFields'
function AddressForm({ setOpenForm, setSelectedAddress, user, selectedAddress }) {
  const [provinceList, setProvinceList] = React.useState([])
  const [cityList, setCityList] = React.useState([])
  const [provinceError, setProvinceError] = React.useState(null)
  const [cityError, setCityError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [citiesLoading, setCitiesLoading] = React.useState(false)
  const [newAddress, setNewAddress] = React.useState(selectedAddress)
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      if (selectedAddress) {
        const currentProvince = response.data.find((province) => province.name === selectedAddress.province)
        if (!currentProvince) return
        setNewAddress({
          ...newAddress,
          province: {
            value: currentProvince.id,
            label: currentProvince.name,
          },
        })
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getProvinceCities = async () => {
    setCitiesLoading(true)
    try {
      const response = await getCityList(newAddress?.province?.label)
      setCityList(
        response.data.cities.map((province) => {
          return {
            value: province.id,
            label: province.name,
          }
        }),
      )
      if (selectedAddress) {
        const currentCity = response.data.cities.find((city) => city.name === selectedAddress.city)
        if (!currentCity) return
        setNewAddress({
          ...newAddress,
          city: {
            value: currentCity.id,
            label: currentCity.name,
          },
        })
      }
      setCitiesLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const submitUserAddress = async (data) => {
    if (cityError || provinceError) return
    const userData = {
      f_name: data.f_name,
      l_name: data.l_name,
      address: data.address,
      code: data.code,
      user: user.id,
      receiver_phone: data.receiver_phone,
      city: newAddress.city.label,
      province: newAddress.province.label,
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

  const prevProvince = usePrevious(newAddress.province)
  useEffect(() => {
    if (prevProvince?.value !== newAddress.province.value) getProvinceCities()
  }, [newAddress.province, prevProvince])

  return (
    <div className="checkout__form">
      <div className="checkout__form__content">
        <form onSubmit={handleSubmit((data) => submitUserAddress(data))}>
          {AddressFields.map((field) => {
            return (
              <div className="checkout__form__content__item">
                <div className="label">{field.label}</div>
                {field.name === 'province' ? (
                  <>
                    <CustomAutoComplete
                      isLoading={isLoading}
                      options={provinceList}
                      onChange={(e, value) => {
                        setNewAddress({
                          ...newAddress,
                          city: null,
                          province: value,
                        })
                        setProvinceError(null)
                      }}
                      value={newAddress.province}
                    />
                    {provinceError && <p className="error-message">{provinceError}</p>}
                  </>
                ) : field.name === 'city' ? (
                  <>
                    <CustomAutoComplete
                      isLoading={citiesLoading}
                      options={cityList}
                      onChange={(e, value) => {
                        setNewAddress({
                          ...newAddress,
                          city: value,
                        })
                        setCityError(null)
                      }}
                      value={newAddress.city}
                    />
                    {cityError && <p className="error-message">{cityError}</p>}
                  </>
                ) : field.name === 'address' ? (
                  <textarea
                    {...register('address', { required: 'این فیلد اجباریست' })}
                    id="address"
                    value={newAddress.address || ''}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  <>
                    <input
                      {...register(field.name, { required: 'این فیلد اجباریست' })}
                      id={newAddress[field.name]}
                      value={newAddress[field.name] || ''}
                      name={field.name}
                      onChange={(e) => {
                        newAddress[e.target.name] = e.target.value
                        setNewAddress({
                          ...newAddress,
                          [e.target.name]: e.target.value,
                        })
                      }}
                    />
                    <p className="error-message">
                      <ErrorMessage errors={errors} name={field.name} />
                    </p>
                  </>
                )}
              </div>
            )
          })}

          <div className="checkout__form__content__buttons">
            <button
              onClick={() => {
                if (!newAddress.province.value) {
                  setProvinceError('لطفا استان را انتخاب کنید')
                }

                if (!newAddress.city.value) {
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
