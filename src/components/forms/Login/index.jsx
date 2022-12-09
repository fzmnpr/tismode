import React, { useEffect, useState } from 'react'
import arrowIcon from 'assets/icons/fi_arrow-left-circle.svg'
import loginIcon from 'assets/icons/login.png'
import { phoneNumber } from 'utils/regex/validation'
import { toastConfig } from 'utils/toastConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CheckUserValidation } from './checkUserValidation'
import { createUserProfile, getUserProfile } from 'services/userServices'
import { getUser, getUserCartFromStorage } from 'state/actions'
import { useDispatch } from 'react-redux'
import AnimatedLoading from 'components/UI/AnimatedLoading'
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
          if (localStorage.getItem('redirect')) {
            window.location.href = '/checkout'
            localStorage.removeItem('redirect')
          } else {
            window.location.href = '/'
          }
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
    setIsLoading(true)
    const checkUserValidation = new CheckUserValidation(value)
    if (step === 1) {
      setToken(checkUserValidation.token)
      if (!phoneNumber(value)) {
        setErrorMassage('شماره موبایل را به درستی وارد کنید!')
        return
      }
      setErrorMassage(null)
      const status = await checkUserValidation.sendUserToken()
      if (status === 'success') {
        setStep(2)
        setValue('')
        setPhone(value)
        setIsLoading(false)
      } else {
        toast.error('لطفا دوباره  امتحان  کنید', toastConfig)
        setIsLoading(false)
      }
    } else if (step === 2) {
      if (Number(value) !== token) {
        setErrorMassage('کد اشتباه است')
        setIsLoading(false)
        return
      }
      registerUser()
      setErrorMassage(null)
    }
  }
  return (
    <div className="container">
      <div className="login">
        <div className="login__title">
          <h3>ورود</h3>
          <div className="login__title__divider"></div>
          <h3>ثبت نام</h3>
        </div>
        <div className={`login__form  ${step === 1 ? 'step1' : ''}`}>
          <div className="login__form__command">
            {step === 1 ? 'لطفا شماره تلفن خود را وارد کنید' : 'لطفا کد تایید پیامک شده را وارد کنید'}
          </div>
          <div className="login__form__actions">
            <input
              className={step === 1 ? 'login__form__phone' : 'login__form__code'}
              placeholder={step === 1 ? '09995554444' : '- - - -'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                const numberValue = Number(e.key)
                if (isNaN(numberValue) && e.key !== 'Backspace') e.preventDefault()
              }}
            />
            <button className="login__form__confirm" onClick={confirmLogin} disabled={isLoading}>
              {isLoading ? <AnimatedLoading background={'#000'} /> : step === 1 ? ' ورود' : 'تایید'}
            </button>
            {!isLoading && (
              <button className="login__form__enter" onClick={confirmLogin} disabled={isLoading}>
                {step === 1 ? <img src={loginIcon} alt="login" /> : <img src={arrowIcon} alt="arrow" />}
              </button>
            )}
          </div>
          {errorMassage && <div className="login__form__error">{errorMassage}</div>}
        </div>
      </div>
    </div>
  )
}

export default Login
