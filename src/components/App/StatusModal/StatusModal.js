import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import StatusForm from '../StatusForm/StatusForm'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const StatusModal = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
    setIsOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
    setIsOpen(true)
  }

  if (!isOpen) {
    handleOpen()
  }

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Bientôt pret à expertiser ! </h2>
            <StatusForm />
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default StatusModal