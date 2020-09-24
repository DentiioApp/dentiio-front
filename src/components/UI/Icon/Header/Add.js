import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PostAddIcon from '@material-ui/icons/PostAdd'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const Add = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const history = useHistory()
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const goToPostCase = () => {
    setAnchorEl(null)
    history.push('/post-case')
  }

  const goToPostQuestion = () => {
    setAnchorEl(null)
    history.push('/post-question')
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToPostCase}>
        <PostAddIcon color='primary' profile={props.profileId} fontSize='large' img={props.profileImg} />
        <Typography component='p' variant='subtitle1'>
          <strong> Publier</strong> un cas clinique
        </Typography>
      </MenuItem>
      <MenuItem onClick={goToPostQuestion}>
        <HelpOutlineIcon color='primary' profile={props.profileId} fontSize='large' img={props.profileImg} />
        <Typography component='p' variant='subtitle1'>
          <strong> Poser</strong> votre question à la communauté
        </Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <IconButton
        aria-haspopup='true'
        aria-controls={menuId}
        onClick={handleProfileMenuOpen}
        aria-label='show new notifications'
        color='inherit'
      >
        <AddCircleOutlineIcon fontSize='large' htmlColor={props.color} />
      </IconButton>
      {renderMenu}
    </>
  )
}

export default Add
