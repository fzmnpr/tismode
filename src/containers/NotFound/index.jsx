import { ArrowBack, ArrowBackIos } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found container">
      <p className="not-found__status">404</p>
      <p className="not-found__text">اطلاعاتی برای نمایش پیدا نشد :(</p>
      <Link to="/"> بازگشت به صفحه اصلی</Link>
    </div>
  )
}

export default NotFound
