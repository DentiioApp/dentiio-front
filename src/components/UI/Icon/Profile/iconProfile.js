import React from 'react'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import PersonIcon from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'

const iconProfile = (props) => {

  if (props.target === 'profile') {
    return (
      <IconButton
        aria-label='account of current user'
        aria-haspopup='true'
        color='inherit'
      >
        <PersonIcon fontSize='large' htmlColor={props.color} />
      </IconButton>
    )
  }
  return (
    <IconButton
      aria-label='account of current user'
      aria-haspopup='true'
      color='inherit'
    >
      <PermIdentityIcon fontSize='large' htmlColor={props.color} />
    </IconButton>
  )
}

export default iconProfile
