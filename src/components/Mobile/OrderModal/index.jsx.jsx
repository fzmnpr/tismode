import AnimatedLoading from 'components/UI/AnimatedLoading'
import DrawerModal from 'components/UI/DrawerModal'
import { convertToPersian } from 'utils/convertNumbers'
import { getDeliveryPrice } from 'utils/getTotalPrice'
import { Divider } from '@mui/material'
import priceImage from 'assets/images/Frame 297.png'

function OrderModal({ openModal, orderItems, setOpenModal, loadingOrderItems }) {
  const deliveryPrice = getDeliveryPrice(orderItems[0]?.order_shipping)
  return (
    <>
      <DrawerModal open={openModal} setOpen={setOpenModal} title={`جزییات سفارش`} isLoading={loadingOrderItems}>
        <div className="order-items">
          <div className="order-items-body">
            {orderItems.map((item, index) => (
              <div key={item.id}>
                <div className="order-item">
                  <div>
                    <div className="order-item__image">
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="order-item__title">{item.product_name}</div>
                    <div className="order-item__quantity">{item.quantity}x</div>
                    <div className="order-item__price">{item.price}</div>
                  </div>
                </div>
                {index !== orderItems.length - 1 ? <Divider /> : null}
              </div>
            ))}
          </div>
          {orderItems?.length ? (
            <div className="order-items__footer">
              <div className="order-items__footer__item">
                <div className="order-items__footer__item-price">
                  <img src={priceImage} alt="تومان" />
                  {convertToPersian(orderItems[0]?.order_total_price)}
                </div>
                <div>قیمت کالاها</div>
              </div>
              <div className="order-items__footer__item">
                <div className="order-items__footer__item-price">
                  {deliveryPrice > 0 ? <img src={priceImage} alt="تومان" /> : null}

                  {deliveryPrice > 0 ? convertToPersian(deliveryPrice) : 'پس کرایه'}
                </div>
                <div>هزینه ارسال</div>
              </div>
              <div className="order-items__footer__item">
                <div className="order-items__footer__item-price">
                  <img src={priceImage} alt="تومان" />

                  {convertToPersian(orderItems[0]?.order_total_price + deliveryPrice)}
                </div>
                <div>هزینه پرداختی</div>
              </div>
            </div>
          ) : null}
        </div>
      </DrawerModal>
    </>
  )
}

export default OrderModal
