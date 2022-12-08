export const isLoggedIn = () => {
  const token = localStorage.getItem('user')
  return token ? true : false
}
