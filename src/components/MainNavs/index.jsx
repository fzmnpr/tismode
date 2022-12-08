import { headerNavs } from 'Layout/linkList'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MainNavs() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState(null)
  const goToLink = (nav) => {
    navigate(nav.url)
    setActiveNav(nav.url)
  }
  useEffect(() => {
    const path = window.location.pathname
    const nav = headerNavs.find((nav) => nav.url === path)
    setActiveNav(nav ? nav.url : null)
  }, [])
  return (
    <div className="nav-links">
      {headerNavs.map((nav, index) => (
        <span
          key={index}
          className={` nav-item ${activeNav === nav.url ? 'active' : ''}`}
          onClick={() => goToLink(nav)}
        >
          <img src={nav.icon} alt={nav.name} className="nav-icon" />
          <span className="nav-item__text">{nav.name}</span>
        </span>
      ))}
    </div>
  )
}

export default MainNavs
