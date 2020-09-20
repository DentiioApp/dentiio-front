import React from 'react'
// import NotificationsIcon from '@material-ui/icons/Notifications';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import palette from "../../ColorTheme/Palette";
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from "@material-ui/core/Typography";
import IconNotifSubject from "../../Icon/iconNotifSubject/iconNotifSubject"

const add = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
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
      <MenuItem onClick={handleMenuClose}>
          <PostAddIcon color={palette.primary} profile={props.profileId} img={props.profileImg} />
        <Typography component='p' variant='p'>
          <strong>Poster</strong> votre cas clinique
        </Typography>
        <IconNotifSubject/>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <HelpOutlineIcon color={palette.primary} profile={props.profileId} img={props.profileImg} />
        <Typography component='p' variant='p'>
          <strong>Poser</strong> votre question à la communauté
        </Typography>
        <IconNotifSubject/>
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

export default add
