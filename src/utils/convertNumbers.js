export function convertToPersian(value) {
  return new Intl.NumberFormat('ar-EG').format(`${value}`)
}
