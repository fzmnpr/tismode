import EditIcon from 'components/UI/Icons/EditIcon'
import LocationIcon from 'components/UI/Icons/LocationIcon'

function CheckoutAddress({ address, openForm, setOpenForm }) {
  return (
    <div className="addresses__list__item checkout-box-item">
      <div>
        <LocationIcon />
      </div>
      <div className="addresses__list__item__address">
        <h3>آدرس:</h3>
        <p className="addresses__list__item__text">
          {address.province},{address.city},{address.address}
        </p>
        <span className="addresses__list__item__edit" onClick={() => setOpenForm(true)}>
          <span>
            <EditIcon />
          </span>
          <span>ویرایش</span>
        </span>
      </div>
    </div>
  )
}

export default CheckoutAddress
