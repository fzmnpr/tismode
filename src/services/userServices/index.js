import { API_KEY, TEMPLATE_Name } from 'services/userServices/KaveNegar'

import axios from 'axios'
import { request } from 'utils/customAxiosInterceptor'

export const sendUserToken = async (value, token) => {
  const response = await axios.get(
    `https://api.kavenegar.com/v1/${API_KEY}/verify/lookup.json?receptor=${value}&token=${token}&template=${TEMPLATE_Name}`,
  )
  if (response.data.return.status === 200) {
    return 'success'
  }
}

export const createUserProfile = (mobile) => request.post('CreateUser', { mobile })
export const getUserProfile = (phone) => request.get(`User_Profile?search=${phone}`)
