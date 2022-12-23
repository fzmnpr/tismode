import { companyInfo } from 'ShopInformation'
import React from 'react'

function ContactUs() {
  return (
    <div className="contact-us container page">
      <h3 className="contact-us__title">ارتباط با ما</h3>
      <div className="contact-us__content">
        <div className="contact-us__content__item">
          <h5 className="contact-us__content__item__title">آدرس</h5>
          <div className="contact-us__content__item__content">
            <p>{companyInfo.address}</p>
          </div>
        </div>
        <div className="contact-us__content__item">
          <h5 className="contact-us__content__item__title">تلفن</h5>
          <div className="contact-us__content__item__content">
            <p>{companyInfo.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
