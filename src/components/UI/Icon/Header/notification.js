import React from 'react'
// import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import palette from "../../ColorTheme/Palette";
import IconProfile from "../Profile/iconProfile";
import Typography from "@material-ui/core/Typography";
import IconNotifSubject from "../../Icon/iconNotifSubject/iconNotifSubject"

const notification = (props) => {
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
          <IconProfile color={palette.primary} profile={props.profileId} img={props.profileImg} />
        <Typography component='p' variant='p'>
          <strong>Nikita</strong>
          <br/>
          a commenté votre cas
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
        <Badge badgeContent={17} color='secondary'>
          <NotificationsOutlinedIcon fontSize='large' htmlColor={props.color} />
        </Badge>
      </IconButton>
      {renderMenu}
    </>
  )
}

export default notification
