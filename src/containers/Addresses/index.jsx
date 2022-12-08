import AddressListItem from 'components/AddressListItem'
import React from 'react'
import { request } from 'utils/customAxiosInterceptor'
import Skeleton from '@mui/material/Skeleton'

function Addresses() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [addresses, setAddresses] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const getAddresses = async () => {
    const response = await request.get(`OrderList`)
    const data = response.data
    const addresses = []
    data.forEach((order) => {
      if (order.user === user[0].id) {
        addresses.push(`${order.province} , ${order.city} , ${order.address}`)
      }
    })
    const unique = [...new Set(addresses)]

    setAddresses(unique)
    setLoading(false)
  }
  React.useEffect(() => {
    if (user) {
      getAddresses()
    }
  }, [])
  if (!user) return <div>Please login to see your addresses</div>
  return (
    <div className="addresses container page">
      <h3>آدرس های شما</h3>
      <div className="addresses__list">
        {loading ? (
          <Skeleton variant="rectangular" animation="wave" height={80} />
        ) : (
          addresses.map((address, index) => <AddressListItem address={address} key={index} />)
        )}
      </div>
    </div>
  )
}

export default Addresses
