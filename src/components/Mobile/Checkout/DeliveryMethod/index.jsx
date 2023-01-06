import DeliveryIcon from 'components/UI/Icons/DeliveryIcon'
import ChaparImage from 'assets/images/chapar.png'
import postImage from 'assets/images/post.png'
import tipaxImage from 'assets/images/tipaks.png'
const methodsList = [
  {
    name: 'پست پیشتاز',
    id: 1,
    slug: 'post',
    image: postImage,
  },
  {
    name: 'تیپاکس',
    id: 2,
    slug: 'tipax',
    image: tipaxImage,
  },
  {
    name: 'چاپار',
    id: 3,
    slug: 'chapar',
    image: ChaparImage,
  },
]

/** 1.post, 2.tipax, 3.chapar */
function DeliveryMethod({ deliveryMethod, setDeliveryMethod }) {
  return (
    <div className="delivery-method checkout-box-item">
      <div className="delivery-method__body">
        <div>
          <DeliveryIcon />
        </div>
        <div className="delivery-method__items__wrapper">
          <h3>شیوه ارسال</h3>
          <div className="delivery-method__items">
            {methodsList.map((item) => (
              <div
                className={`delivery-method__item ${
                  deliveryMethod === item.slug ? 'delivery-method__item--selected' : ''
                }`}
                key={item.id}
                onClick={() => setDeliveryMethod(item.slug)}
              >
                <div className="delivery-method__item__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="delivery-method__item__title">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryMethod
