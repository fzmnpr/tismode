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
import TopCustomBanner from 'components/Mobile/TopCustomBanners/TopCustomBanners'
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
        toast.success('?????? ???? ???????????? ???????? ????????', toastConfig)
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
          toast.success('?????? ???? ???????????? ???????? ????????', toastConfig)
          // window.location.href = '/checkout'
          // localStorage.removeItem('redirect')
          navigate(-1)

          dispatch(getUser(user.data))
          dispatch(getUserCartFromStorage(user.data))
        } else {
          toast.error('???????? ???????????? ???????????? ????????', toastConfig)
        }
      } else {
        toast.error('?????????? ???? ???????? ??????', toastConfig)
        setStep(1)
        setValue('')
      }
      setIsLoading(false)
    }
  }

  async function confirmLogin() {
    if (!value) {
      setErrorMassage('?????????? ???????????? ???? ???? ?????????? ???????? ????????!')
      return
    }
    const phoneNumberValue = convertToEnglish(value)

    if (step === 1) {
      if (!phoneNumber(phoneNumberValue)) {
        setErrorMassage('?????????? ???????????? ???? ???? ?????????? ???????? ????????!')
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
        toast.error('???????? ????????????  ????????????  ????????', toastConfig)
        setIsLoading(false)
      }
    } else if (step === 2) {
      if (parseInt(convertToEnglish(phoneNumberValue)) !== parseInt(token)) {
        setErrorMassage('???? ???????????? ??????')
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
            {step === 1 ? '???????? ?????????? ???????? ?????? ???? ???????? ????????' : '???????? ???? ?????????? ?????????? ?????? ???? ???????? ????????'}
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
          {isLoading && <div className="login__form__loading-text">?????????? ???????????? ??????????????...</div>}
        </div>
      </div>
    </div>
  )
}

export default Login
