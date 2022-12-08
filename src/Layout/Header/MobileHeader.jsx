import mobileLogo from 'assets/icons/Frame102.svg'
import SearchBar from 'components/forms/searchbar'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from 'Routes'
import MenuIcon from 'components/UI/Icons/MenuIcon'

function MobileHeader() {
  return (
    <div className="mobile-header">
      <div className="sm-margin mobile-menu-icon">
        <MenuIcon />
      </div>
      <div className="sm-margin mobile-searchbar">
        <SearchBar />
      </div>
      <div className="sm-margin">
        <Link to={ROUTE_PATHS.home}>
          <img src={mobileLogo} alt="logo" className="mobile-logo" />
        </Link>
      </div>
    </div>
  )
}

export default MobileHeader
