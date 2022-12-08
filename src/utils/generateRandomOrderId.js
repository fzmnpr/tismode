export const generateRandomOrderId = () => {
  const randomNumber = Math.floor(Math.random() * 1000000)
  return randomNumber
}
