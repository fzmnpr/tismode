import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AnimatedLoading from 'components/UI/AnimatedLoading'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    minHeight: 'calc(60% + 50px)',
    overflowY: 'visible',
  },

  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    overflow: 'visible',
  },
  '& .MuiPaper-root': {
    minWidth: 'calc(100vw - 60%)',
    width: '100%',
    minHeight: 'calc(20% + 50px)',

    position: 'relative',
    overflow: 'visible',
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'left' }} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      {children}
    </DialogTitle>
  )
}

export function Modal({ open, setOpen, title, handleClose, children, actions, isLoading }) {
  const closeModal = () => {
    setOpen(false)
  }
  return (
    <div>
      <BootstrapDialog onClose={handleClose || closeModal} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose || closeModal}>
          {title}
        </BootstrapDialogTitle>

        {isLoading ? (
          <AnimatedLoading isFullPage={true} background={'#e74c3c'} />
        ) : (
          <>
            <DialogContent dividers>{children}</DialogContent>
            {actions ? <DialogActions>{actions}</DialogActions> : null}
          </>
        )}
      </BootstrapDialog>
    </div>
  )
}
