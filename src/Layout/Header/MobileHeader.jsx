import mobileLogo from 'assets/logos/logo.png'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from 'Routes'
import MenuIcon from 'components/UI/Icons/MenuIcon'
import SearchBar from 'components/shared/forms/searchbar'

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
          <img src={mobileLogo} alt="logo" className="mobile-logo" width={32} height={30} />
        </Link>
      </div>
    </div>
  )
}

export default MobileHeader
