import {
  REGEX_alphanumericAndNumber,
  REGEX_number,
  REGEX_persian,
  REGEX_dotAlpha,
  REGEX_email,
  REGEX_string,
  REGEX_EngdotAlpha,
  REGEX_date,
  REGEX_decimalNumber,
  REGEX_PHONENUMBER,
} from './_regex'

export const alphanumericAndNumber = (str) => {
  const regex = new RegExp(REGEX_alphanumericAndNumber)
  return regex.test(str)
}
export const numberReg = (str) => {
  const regex = new RegExp(REGEX_number)
  return regex.test(str)
}
export const persianReg = (str) => {
  const regex = new RegExp(REGEX_persian)
  return regex.test(str)
}
export const alphaDotReg = (str) => {
  const regex = new RegExp(REGEX_dotAlpha)
  return regex.test(str)
}
export const emailReg = (str) => {
  const regex = new RegExp(REGEX_email)
  return regex.test(str)
}
export const stringReg = (str) => {
  const regex = new RegExp(REGEX_string)
  return regex.test(str)
}
export const engDotAlpha = (str) => {
  const regex = new RegExp(REGEX_EngdotAlpha)
  return regex.test(str)
}
export const dateReg = (str) => {
  const regex = new RegExp(REGEX_date)
  return regex.test(str)
}
export const decimalNumber = (str) => {
  const regex = new RegExp(REGEX_decimalNumber)
  return regex.test(str)
}
export const phoneNumber = (str) => {
  const regex = new RegExp(REGEX_PHONENUMBER)
  return regex.test(str)
}
