import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export { PrivateRoute }

function PrivateRoute({ children }) {
  const userInfo = localStorage.getItem('user')
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      if (window.location.href.includes('checkout')) localStorage.setItem('redirect', 'checkout')
      navigate('/login')
    }
  }, [])

  // authorized so return child components
  return children
}
