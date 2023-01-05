import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'

function Breadcrumb({ crumbs, isLoading }) {
  function isLast(index) {
    return index === crumbs.length - 1
  }
  if (isLoading) return <Skeleton variant="rectangle" />

  return (
    <nav>
      <div className="breadcrumb">
        <div className="breadcrumb-item">
          <Link to="/" className="btn btn-link">
            خانه/
          </Link>
        </div>
        {crumbs.map((crumb, ci) => {
          const disabled = isLast(ci) ? 'disabled' : ''

          return (
            <div key={ci} className="breadcrumb-item">
              <Link to={crumb.link} className={`btn btn-link ${disabled}`}>
                {crumb.name}
              </Link>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default Breadcrumb
