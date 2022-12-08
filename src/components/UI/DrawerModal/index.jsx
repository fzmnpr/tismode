import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Divider } from '@mui/material'
import { useWindowSize } from 'hooks/useWindowSize'
import { Modal } from 'components/shared/Modal/index'
import AnimatedLoading from '../AnimatedLoading'
import lockScroll from 'react-lock-scroll'

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}))

const StyledBox = styled(Box)(() => ({
  backgroundColor: '#fff',
}))

const Puller = styled(Box)(() => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))
const Drawer = styled(SwipeableDrawer)(({ theme }) => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}))

function DrawerModal({ open, setOpen, title, data, children, isLoading }) {
  // This is used only for the example
  // eslint-disable-next-line no-undefined
  const { windowSize } = useWindowSize()
  lockScroll(open)
  if (windowSize === 'lg') {
    return (
      <Modal open={open} title={title} setOpen={setOpen} isLoading={isLoading}>
        {children}
      </Modal>
    )
  }
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
          },
        }}
      />
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: '-25px',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            textAlign: 'right',
          }}
        >
          <Puller />
          <Typography
            sx={{
              padding: '5px 16px',
              pb: '10px',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            {' '}
            {title}
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            py: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Divider />
          <StyledBox
            sx={{
              mt: 2,
            }}
          >
            {isLoading ? <AnimatedLoading isFullPage={true} background={'#e74c3c'} /> : children}
          </StyledBox>
        </StyledBox>
      </Drawer>
    </Root>
  )
}

export default DrawerModal
