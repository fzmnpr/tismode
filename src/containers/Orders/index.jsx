import OrderModal from 'components/Mobile/OrderModal/index.jsx.jsx'
import { convertToPersian } from 'utils/convertNumbers'
import { request } from 'utils/customAxiosInterceptor'
import { Skeleton } from '@mui/material'
import moment from 'moment-jalaali'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
const getStatusName = (status) => {
  switch (status) {
    case 'unpaided':
      return 'در انتظار پرداخت'
    case 'cancelled':
      return 'لغو شده'
    case 'in_progress':
      return 'در حال پردازش'
    case 'delivered':
      return 'تحویل شده'
    default:
      return ''
  }
}
function Orders() {
  const { userId, status } = useParams()
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState('')
  const [orderItems, setOrderItems] = useState([])
  const [loadingOrderItems, setLoadingOrderItems] = useState(false)
  async function getOrders() {
    const orders = await request.get(`OrderList?search=${userId}`)
    if (orders.data) {
      const orderList = orders.data.filter((orderItem) => orderItem.status === status)
      setOrderList(orderList)
      setLoading(false)
    }
  }
  async function getOrderItems() {
    if (!selectedOrder) return
    setLoadingOrderItems(true)
    const itemOrderList = await request.get(`ItemOrderList_History?search=${selectedOrder}`)
    if (itemOrderList.data) {
      setOrderItems(itemOrderList.data)
    }
    setLoadingOrderItems(false)
  }
  const statusName = useMemo(() => getStatusName(status), [status])
  useEffect(() => {
    new moment.loadPersian({ usePersianDigits: true })
    getOrders()
  }, [])

  useEffect(() => {
    if (openModal) {
      getOrderItems()
    } else {
      setSelectedOrder('')
      setOrderItems([])
    }
  }, [openModal])
  return (
    <div className="user-orders container">
      <h3>سفارشات {statusName}</h3>
      {loading ? (
        <Skeleton variant="rectangular" animation="wave" height={300} />
      ) : orderList?.length ? (
        <div className="orders__list">
          {orderList.map((item) => (
            <div className="order__list__item box" key={item.id}>
              <span>شماره سفارش: {convertToPersian(item.id)}</span>
              <div className="order__item__row">
                <div className="order__item__title">نام تحویل گیرنده</div>
                <div className="order__item__info">
                  {item.f_name} {item.l_name}
                </div>
              </div>
              <div className="order__item__row">
                <div className="order__item__title">شماره تماس تحویل گیرنده</div>
                <div className="order__item__info">{item.receiver_phone}</div>
              </div>
              <div className="order__item__row">
                <div className="order__item__title">آدرس تحویل گیرنده</div>
                <div className="order__item__info">
                  {item.province}, {item.city},{item.address}
                </div>
              </div>
              <div className="order__item__row">
                <div className="order__item__title">تاریخ و زمان ثبت سفارش</div>
                <div className="order__item__info">
                  {moment(item.create, 'YYYY/MM/DD HH:mm:ss').format('jYYYY/jM/jD - HH:mm')}
                </div>
              </div>
              <div className="order__item__row">
                <div className="order__item__title">نحوه ارسال</div>
                <div className="order__item__info">
                  {item.shipping === 'tipax' ? 'تیپاکس' : item.shipping === 'post' ? 'پست پیشتاز' : 'چاپار'}
                </div>
              </div>
              <div
                className="order__item__show"
                onClick={() => {
                  setOpenModal(true)
                  setSelectedOrder(item.id)
                }}
              >
                مشاهده جزییات سفارش
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="orders__list__empty">سفارشی پیدا نشد</div>
      )}
      {openModal ? (
        <OrderModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          orderItems={orderItems}
          loadingOrderItems={loadingOrderItems}
        />
      ) : null}
    </div>
  )
}

export default Orders
