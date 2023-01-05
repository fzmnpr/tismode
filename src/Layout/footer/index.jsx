import React from 'react'
import logo from 'assets/logos/footer-logo.png'
import twitter from 'assets/logos/Twitter.svg'
import facebook from 'assets/logos/Facebook.svg'
import instagram from 'assets/logos/instagram.svg'

function Footer({ size }) {
  return (
    <>
      <div className="footer">
        <div className="footer__navs">
          <div className="footer__logo">
            <p>رایان سافت</p>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="footer__footer">
          <div className="footer__copyright">
            <p>تمامی حقوق برای کاربران این محصول محفوظ است</p>
          </div>
          <div className="footer__social">
            <img src={instagram} alt="instagram" />

            <img src={facebook} alt="facebook" />
            <img src={twitter} alt="twitter" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
