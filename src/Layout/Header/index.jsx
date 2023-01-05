import userIcon from 'assets/icons/user.svg'
import cartIcon from 'assets/icons/shopping-cart.svg'
import logoIcon from 'assets/logos/logo_icon.svg'
import { Link } from 'react-router-dom'
import MobileHeader from './MobileHeader'
import { useState } from 'react'
import { ROUTE_PATHS } from 'Routes'
function Header({ size }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      {(size === 'sm' || size === 'xs' || size === 'md') && <MobileHeader />}
      <div className="header-navs">
        <div className="nav-links">
          <div className="nav-item circular">
            <Link to={ROUTE_PATHS.home}>
              <img src={logoIcon} alt="logo" />
            </Link>
          </div>
          <div className="nav-item circular user" onClick={() => setOpen(!open)}>
            <img src={userIcon} alt="کاربر" title="صفحه کاربری" className="user" />
          </div>

          <div className="nav-item circular">
            <Link to={ROUTE_PATHS.cart}>
              <img src={cartIcon} alt="سبدخرید" title="سبد خرید" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
