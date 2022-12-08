export const getUser = (user) => (dispatch) => {
  dispatch({
    type: 'GET_USER',
    payload: user,
  })
}
export const getUserFromStorage = () => async (dispatch) => {
  const user = localStorage.getItem('user')
  if (user) {
    const userInfo = JSON.parse(user)
    dispatch({
      type: 'GET_USER_FROM_STORAGE',
      payload: userInfo,
    })
  } else {
    dispatch({
      type: 'GET_USER_FROM_STORAGE',
      payload: null,
    })
  }
}
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('user')
  dispatch(getUserFromStorage())
  if (window.location.href === '#/checkout') {
    window.location.href = '#/'
  }
  dispatch({
    type: 'REMOVE_USER',
  })
}
