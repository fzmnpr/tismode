export const REGEX_alphanumericAndNumber = /^[0-9a-zA-Z]+$/
export const REGEX_persian = /^[a-zA-Z\u0600-\u06FF\s]+$/
export const REGEX_string = /^[0-9a-zA-Z\u0600-\u06FF\s]+$/
export const REGEX_number = /^[0-9,\b][0-9,\b]*$/
export const REGEX_dotAlpha = /^[a-zA-Z\u0600-\u06FF\s..]+$/
export const REGEX_EngdotAlpha = /^[a-zA-Z..]+$/
export const REGEX_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
export const REGEX_date =
  /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/
export const REGEX_decimalNumber = /[(//d+)((.\d{1,2})?)]$/
export const REGEX_PHONENUMBER = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/gm
///[/۰/gi, /۱/gi, /۲/gi, /۳/gi, /۴/gi, /۵/gi, /۶/gi, /۷/gi, /۸/gi, /۹/gi]
