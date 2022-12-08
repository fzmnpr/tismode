import { FreeMode, Grid } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
function CheckoutProducts({ cart }) {
  return (
    <div className="checkout-products checkout-box-item">
      <h3>کالاهای انتخاب شده:</h3>
      <Swiper
        slidesPerView={4}
        modules={[FreeMode, Grid]}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        followFinger={true}
        allowTouchMove={true}
        loopedSlides={4}
        centeredSlides={false}
        spaceBetween={9}
      >
        {cart.cartItems.map((item) => (
          <SwiperSlide key={item.id} className="checkout-products__product">
            <img src={item.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CheckoutProducts
