import Appbar from 'components/Mobile/Appbar'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './footer'
import Header from './Header'

function Layout({ size, children }) {
  const location = useLocation()
  const isInUserProfile = location.pathname === '/profile' || location.pathname === '/login'
  // const hideAppbar = location.pathname === '/login' || location.pathname === '/checkout'
  return (
    <>
      <Header size={size} />
      {children}
      {!isInUserProfile ? (
        <footer>
          <Footer size={size} />
        </footer>
      ) : null}
      <Appbar />
    </>
  )
}

export default Layout
