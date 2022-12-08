import { useEffect } from 'react'
import defaultAvatar from 'assets/images/profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { navigateTo, ROUTE_PATHS } from 'Routes'
import { Link } from 'react-router-dom'
import { getUserFromStorage } from 'state/actions'
import unpaidImage from 'assets/images/unpaid.png'
import inprogressImage from 'assets/images/inprogress.png'
import deliveredImage from 'assets/images/delivered.png'
import cancelledImage from 'assets/images/cancelled.png'
import LocationIcon from '../UI/Icons/LocationIcon'
// import LocationIcon from 'components/UI/Icons/LocationIcon'

function Profile() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(getUserFromStorage())
  }, [])
  return (
    <div className="profile__info">
      {user && (
        <div className="profile__info__box">
          <div className="profile__info__box__avatar">
            <div className="profile__info__box__avatar__img">
              <img src={user[0]?.avatar || defaultAvatar} alt="avatar" />
            </div>
            {user[0].name ? (
              <div className="profile__info__box__avatar__name">
                <h1>{user[0]?.name}</h1>
                <p>{user[0]?.mobile}</p>
              </div>
            ) : (
              <div className="profile__info__box__avatar__name">
                <h3>{user[0]?.mobile}</h3>
              </div>
            )}
          </div>
          <div className="profile__info__box__orders">
            <Link to={navigateTo.orders(user[0].id, 'unpaided')} className="profile__info__box__order">
              <div className="profile__info__box__order__icon profile__info__box__order__icon--unpaid">
                <img src={unpaidImage} alt="در انتظار پرداخت" />
              </div>
              <div className="profile__info__box__order__text">در انتظار پرداخت</div>
            </Link>
            <Link to={navigateTo.orders(user[0].id, 'in_progress')} className="profile__info__box__order">
              <div className="profile__info__box__order__icon profile__info__box__order__icon--progress">
                <img src={inprogressImage} alt="در حال پردازش" />
              </div>
              <div className="profile__info__box__order__text">در حال پردازش</div>
            </Link>
            <Link to={navigateTo.orders(user[0].id, 'delivered')} className="profile__info__box__order">
              <div className="profile__info__box__order__icon profile__info__box__order__icon--delivered">
                <img src={deliveredImage} alt="تحویل شده" />
              </div>
              <div className="profile__info__box__order__text">تحویل شده</div>
            </Link>
            <Link to={navigateTo.orders(user[0].id, 'cancelled')} className="profile__info__box__order">
              <div className="profile__info__box__order__icon profile__info__box__order__icon--cancelled">
                <img src={cancelledImage} alt="لغو شده" />
              </div>
              <div className="profile__info__box__order__text">لغو شده</div>
            </Link>
          </div>
          <div className="profile__info__box__body">
            <Link to={ROUTE_PATHS.addresses} className="profile__info__box__body__item box">
              <LocationIcon />
              <p>آدرس ها</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
