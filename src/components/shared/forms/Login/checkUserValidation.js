import { generateToken } from 'services/userServices/KaveNegar'
import { phoneNumber } from 'utils/regex/validation'
import { sendUserToken } from 'services/userServices'

export class CheckUserValidation {
  constructor(value, token) {
    this.value = value
    this.token = generateToken()
  }
  get phoneNumber() {
    return phoneNumber(this.value)
  }
  sendUserToken() {
    return sendUserToken(this.value, this.token)
  }
}
