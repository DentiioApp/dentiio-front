import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import {setNotenabled} from "../../../../services/Cases";


const OptionCaseButton = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const deleteCase = () => {
    setNotenabled(props.caseId).then()
    document.getElementById(props.caseId).remove()
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
      <MenuItem onClick={deleteCase}>
        <DeleteIcon color='primary' fontSize='large'/>
        <Typography component='p' variant='subtitle1'>
          Supprimer
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
        color='inherit'
      >
        <MoreVertIcon fontSize='large' color={"primary"} />
      </IconButton>
      {renderMenu}
    </>
  )
}

export default OptionCaseButton
