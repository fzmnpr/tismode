import React, { useEffect } from 'react'
import AppBarShopIcon from 'components/UI/Icons/AppBarShopIcon'
import { Link } from 'react-router-dom'
import UserIcon from 'components/UI/Icons/UserIcon'
import ShoppingBagIcon from 'components/UI/Icons/shoppingBagIcon'
import HomeIcon from 'components/UI/Icons/HomeIcon'
import CallUsIcon from 'components/UI/Icons/CallUsIcon'
import { ROUTE_PATHS } from 'Routes'
import { useSelector } from 'react-redux'
import Popper from '@mui/material/Popper'
import { Box } from '@mui/system'
import { Grow } from '@mui/material'

const color = '#292D32'
const popperStyle = {
  p: 1,
  bgcolor: '#f4544a',
  opacity: '0.7',
  borderRadius: '80px',
  mb: '5px',
  boxShadow: '4px 38px 62px rgb(0 0 0 / 50%)',
}
function Appbar() {
  const { user } = useSelector((state) => state.users)

  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((previousOpen) => !previousOpen)
  }

  // useEffect(() => {
  //   // close the menu when the user clicks outside of it
  //   window.addEventListener('click', (e) => {
  //     if (!e.target.classList.contains('appbar__contact')) {
  //       if (!open || anchorEl) return
  //       handleClick(e)
  //     }
  //   })
  //   return () => {
  //     window.removeEventListener('click', (e) => {
  //       if (!e.target.classList.contains('appbar__contact')) {
  //         console.log(anchorEl, 'anchorEl')
  //         if (!open || anchorEl) return
  //         handleClick(e)
  //       }
  //     })
  //   }
  // }, [])

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined
  return (
    <div className="appbar">
      <div style={{ position: 'relative' }}>
        <div className="appbar__container">
          <Link to={ROUTE_PATHS.home} className="appbar__container__home">
            <span>
              <HomeIcon color={color} />
            </span>
          </Link>
          <Link to={ROUTE_PATHS.categories} className="appbar__container__shop">
            <span>
              <AppBarShopIcon color={color} />
            </span>
          </Link>
          <Link to={ROUTE_PATHS.cart} className="appbar__container__cart">
            <ShoppingBagIcon />
          </Link>
          <Link to={user ? ROUTE_PATHS.profile : ROUTE_PATHS.login} className="appbar__profile">
            <UserIcon color={color} />
          </Link>
          <div onClick={handleClick} className="appbar__contact">
            <CallUsIcon color={color} className={'appbar__contact'} />
          </div>
        </div>

        <div className="appbar-bg">
          <svg
            height="62"
            style={{
              width: 'auto',
              zIndex: -1,
            }}
            viewBox="0 0 486 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_b_84_7923)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M243 44C261.227 44 277.175 35.4043 285.901 22.5647C293.352 11.6021 303.708 0 316.963 0H484C485.105 0 486 0.89543 486 2V60C486 61.1046 485.105 62 484 62H2C0.895429 62 0 61.1046 0 60V2C0 0.895432 0.89543 0 2 0H169.037C182.292 0 192.648 11.6021 200.099 22.5647C208.825 35.4043 224.773 44 243 44Z"
                fill="#DADADA"
                fillOpacity="0.7"
              />
            </g>
            <defs>
              <filter
                id="filter0_b_84_7923"
                x="-20"
                y="-20"
                width="526"
                height="102"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_84_7923" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_84_7923" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <div>
              <Box sx={popperStyle}> whatspapp.</Box>
              <Box sx={popperStyle}> whatspapp.</Box>
            </div>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default Appbar
