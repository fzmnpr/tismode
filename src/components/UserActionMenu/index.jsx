import React, { useEffect } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { getUserFromStorage, logoutUser } from 'state/actions'
import { useDispatch, useSelector } from 'react-redux'
function UserActionMenu({ open, setOpen }) {
  const { user } = useSelector((state) => state.users)
  const isLoggedIn = user && user.length ? true : false

  const ListContent = [
    {
      id: 1,
      name: isLoggedIn ? 'پروفایل' : 'ورود',
      icon: isLoggedIn ? PersonIcon : LoginIcon,
      link: isLoggedIn ? '/profile' : '/login',
      show: true,
    },
    {
      id: 2,
      name: 'خروج',
      icon: LogoutIcon,
      link: '/logout',
      show: isLoggedIn,
    },
  ]

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = (item) => {
    setOpen(false)
    if (item.id === 1) {
      navigate(item.link)
      return
    }
    dispatch(logoutUser())
  }
  useEffect(() => {
    if (open) {
      dispatch(getUserFromStorage())
    }
    window.addEventListener('click', (e) => {
      if (!e.target.classList.contains('user')) {
        setOpen(false)
      }
    })
    return () =>
      window.removeEventListener('click', (e) => {
        if (!e.target.classList.contains('user')) {
          setOpen(false)
        }
      })
  }, [isLoggedIn, dispatch, open, setOpen])

  return (
    <div className="user-action__menu__container">
      {open ? (
        <div className="user-action__menu__content">
          <List>
            {ListContent.map((item) => {
              if (item.show) {
                return (
                  <ListItem button key={item.id} onClick={() => handleClick(item)}>
                    <ListItemButton>
                      <ListItemIcon>
                        <item.icon />
                      </ListItemIcon>
                      <Typography variant="p" sx={{ color: '#000' }}>
                        {item.name}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                )
              }
            })}
          </List>
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(UserActionMenu)
