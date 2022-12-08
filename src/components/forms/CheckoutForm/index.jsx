import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AsyncSelect from 'react-select'
import { getCityList, getProvinceList } from 'services/cityProvinceServices'
import { ErrorMessage } from '@hookform/error-message'
import { proceedOrder } from 'services/orderServices'
import AnimatedLoading from 'components/UI/AnimatedLoading'

function CheckoutForm({ user, cart }) {
  const [provinceList, setProvinceList] = React.useState([])
  const [selectedProvince, setSelectedProvince] = React.useState('')
  const [cityList, setCityList] = React.useState([])
  const [selectedCity, setSelectedCity] = React.useState('')
  const [provinceError, setProvinceError] = React.useState(null)
  const [cityError, setCityError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const getAllProvince = async () => {
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
    } catch (error) {
      console.log(error)
    }
  }

  const getProvinceCities = async () => {
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
    } catch (error) {
      console.log(error)
    }
  }

  const sendDataToServer = async (data) => {
    if (cityError && provinceError) return
    setIsLoading(true)
    const orderInfos = {
      ...data,
      user: user.id,
      city: selectedCity.label,
      province: selectedProvince.label,
      // amount : totalPrice
    }
    const { loading } = await proceedOrder(orderInfos, cart, user)
    setIsLoading(loading)
  }
  useEffect(() => {
    getAllProvince()
  }, [])

  useEffect(() => {
    if (selectedProvince) getProvinceCities()
  }, [selectedProvince])
  const styles = {
    control: (base, state) => ({
      ...base,
      width: '100% ',
      fontSize: '14px',
      borderRadius: '24px',
      minHeight: '45px',
      border: state.isFocused ? '1px solid #eb5757' : '1px solid #ced4da',
      outline: 'none',
      padding: '0px 10px',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(234, 87, 87, 0.25)' : 'none',
    }),
    option: (base, state) => ({
      ...base,
      fontSize: '14px',
      padding: '10px',
    }),
  }
  return (
    <div className="checkout__form">
      <div className="checkout__form__title">
        <h3>لطفا اطلاعات خود را وارد کنید</h3>
      </div>
      <div className="checkout__form__content">
        <form onSubmit={handleSubmit((data) => sendDataToServer(data))}>
          <div className="checkout__form__content__row">
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
              <AsyncSelect
                classNamePrefix="react-select"
                label="استان"
                options={provinceList}
                onChange={(e) => {
                  setSelectedProvince(e)
                  setProvinceError(null)
                }}
                placeholder="انتخاب کنید.."
                loadingOptions={getAllProvince}
                noOptionsMessage={() => 'استانی یافت نشد'}
                loadingMessage={() => 'در حال بارگذاری...'}
                styles={styles}
                maxMenuHeight={200}
              />
              {provinceError && <p className="error-message">{cityError}</p>}
            </div>
          </div>
          <div className="checkout__form__content__row">
            <div className="checkout__form__content__item">
              <div className="label">شهر</div>
              <AsyncSelect
                classNamePrefix="react-select"
                label="شهر"
                options={cityList}
                placeholder="انتخاب کنید..."
                loadingOptions={getAllProvince}
                noOptionsMessage={() => 'نتیجه ای یافت نشد'}
                loadingMessage={() => 'در حال بارگذاری...'}
                onChange={(e) => {
                  setSelectedCity(e)
                  setCityError(null)
                }}
                styles={styles}
              />
              {cityError && <p className="error-message">{cityError}</p>}
            </div>
            <div className="checkout__form__content__item">
              <div className="label">آدرس </div>
              <input {...register('address', { required: 'این فیلد اجباریست' })} id="address" />
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
          </div>
          <div className="checkout__form__content__row">
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
            <div className="checkout__form__content__item"></div>
            <div className="checkout__form__content__item"></div>
          </div>
          <div className="checkout__form__content__row checkout__form__content__row--last-child">
            <div className="checkout__form__content__item">
              <div className="label">یادداشت </div>
              <textarea
                {...register('notes')}
                placeholder="نکات ضروری هنگام ارسال را وارد نمایید"
                id="notes"
                rows="8"
              />
            </div>
            <div className="checkout__form__content__footer">
              <button
                onClick={() => {
                  if (typeof selectedProvince === 'string') {
                    console.log(typeof selectedProvince)
                    setProvinceError('لطفا استان را انتخاب کنید')
                  }

                  if (typeof selectedCity === 'string') {
                    setCityError('لطفا شهر را انتخاب کنید')
                  }
                }}
                type="submit"
                className="checkout__form__content__submit-btn submit-btn"
              >
                {isLoading ? <AnimatedLoading bottom={'0.5rem'} background={'#000'} /> : 'ثبت اطلاعات و پرداخت'}
              </button>
              <div className="checkout__form__content__price-wrapper">
                <p>مبلغ قابل پرداخت با احتساب هزینه ارسال </p>
                <p className="checkout__form__content__price-wrapper__price">{cart?.totalPrice} تومان</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
