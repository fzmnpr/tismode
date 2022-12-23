import React, { useEffect, useMemo, useState } from 'react'
import { phoneNumber } from 'utils/regex/validation'
import { toastConfig } from 'utils/toastConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CheckUserValidation } from './checkUserValidation'
import { createUserProfile, getUserProfile } from 'services/userServices'
import { getCategories, getUser, getUserCartFromStorage } from 'state/actions'
import { useDispatch, useSelector } from 'react-redux'
import { convertToEnglish } from 'utils/convertNumbers'
import LoginIcon from 'components/UI/Icons/LoginIcon'
import { request } from 'utils/customAxiosInterceptor'
import TopCustomBanner from 'components/TopCustomBanners/TopCustomBanners'
function Login() {
  const [step, setStep] = useState(1)
  const [value, setValue] = useState('')
  const [errorMassage, setErrorMassage] = useState(null)
  const [token, setToken] = useState(null)
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        confirmLogin()
      }
    }
    window.addEventListener('keydown', handleEnter)
    return () => window.removeEventListener('keydown', handleEnter)
  }, [value])
  const [customBanners, setCustomBanners] = useState([])
  const getCustomBanners = async () => {
    try {
      const customBanners = await request.get('CustomBanner')
      setCustomBanners(customBanners?.data?.filter((banner) => banner.is_enabled))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useMemo(() => getCustomBanners(), [])
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  const { categories } = useSelector((state) => state.categories)
  const registerUser = async () => {
    setIsLoading(true)
    try {
      const response = await createUserProfile(phone)
      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify([response.data.data]))
        toast.success('شما با موفقیت وارد شدید', toastConfig)
        navigate(-1)
        dispatch(getUser([response.data.data]))
        setIsLoading(false)
      } else {
        setIsLoading(true)
        toast.error(response.errorMassage, toastConfig)
      }
    } catch (error) {
      if (error.response.data.status === 'error' || error.response.status === 400 || error.response.status === 404) {
        const user = await getUserProfile(phone)
        if (user.data?.length) {
          localStorage.setItem('user', JSON.stringify(user.data))
          toast.success('شما با موفقیت وارد شدید', toastConfig)
          // window.location.href = '/checkout'
          // localStorage.removeItem('redirect')
          navigate(-1)

          dispatch(getUser(user.data))
          dispatch(getUserCartFromStorage(user.data))
        } else {
          toast.error('لطفا دوباره امتحان کنید', toastConfig)
        }
      } else {
        toast.error('خطایی رخ داده است', toastConfig)
        setStep(1)
        setValue('')
      }
      setIsLoading(false)
    }
  }

  async function confirmLogin() {
    if (!value) {
      setErrorMassage('شماره موبایل را به درستی وارد کنید!')
      return
    }
    const phoneNumberValue = convertToEnglish(value)

    if (step === 1) {
      if (!phoneNumber(phoneNumberValue)) {
        setErrorMassage('شماره موبایل را به درستی وارد کنید!')
        setIsLoading(false)
        return
      }
      setErrorMassage(null)
      setIsLoading(true)
      const checkUserValidation = new CheckUserValidation(phoneNumberValue)
      setToken(checkUserValidation.token)
      const status = await checkUserValidation.sendUserToken()
      if (status === 'success') {
        setStep(2)
        setValue('')
        setPhone(phoneNumberValue)
        setIsLoading(false)
      } else {
        toast.error('لطفا دوباره  امتحان  کنید', toastConfig)
        setIsLoading(false)
      }
    } else if (step === 2) {
      if (parseInt(convertToEnglish(phoneNumberValue)) !== parseInt(token)) {
        setErrorMassage('کد اشتباه است')
        setIsLoading(false)
        return
      }
      registerUser()
      setErrorMassage(null)
    }
  }
  return (
    <div>
      <TopCustomBanner
        banners={customBanners.filter((banner) => banner.placement === 'Top')}
        isLoading={false}
        categories={categories}
      />
      <div className="login">
        <div className={`login__form  ${step === 1 ? 'step1' : ''}`}>
          <div className="login__form__command">
            {step === 1 ? 'لطفا شماره تلفن خود را وارد کنید' : 'لطفا کد تایید پیامک شده را وارد کنید'}
          </div>
          <div className="login__form__actions">
            <input
              className="login__form__input"
              placeholder={step === 1 ? ' - - - - - - - - - 9 0' : '- - - -'}
              value={value}
              onChange={(e) => {
                if (errorMassage) setErrorMassage(null)
                setValue(e.target.value)
              }}
              onKeyDown={(e) => {
                const numberValue = Number(e.key)
                if (isNaN(numberValue) && e.key !== 'Backspace') e.preventDefault()
              }}
            />
            <button
              className={`login__form__button ${isLoading && 'login__form__button--loading'}`}
              onClick={confirmLogin}
              disabled={isLoading}
            >
              <LoginIcon />
            </button>
          </div>
          {errorMassage && <div className="login__form__error">{errorMassage}</div>}
          {isLoading && <div className="login__form__loading-text">درحال دریافت اطلاعات...</div>}
        </div>
      </div>
    </div>
  )
}

export default Login
