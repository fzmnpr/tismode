import { useEffect } from 'react'
import { toastConfig } from 'utils/toastConfig'
import { toast } from 'react-toastify'

export { PrivateRoute }

function PrivateRoute({ children }) {
  const userInfo = localStorage.getItem('user')

  useEffect(() => {
    if (!userInfo) {
      if (window.location.href === '#/checkout') localStorage.setItem('redirect', 'checkout')
      window.location.href = '#/login'
      toast.error('لطفا ابتدا وارد شوید', toastConfig)
    }
  })

  // authorized so return child components
  return children
}
