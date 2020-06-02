import React from 'react'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import PersonIcon from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'

const profile = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory()
  if (props.target === 'profile') {
    return (
      <IconButton
        onClick={() => history.push('/profile')}
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
      onClick={() => history.push('/profile')}
      aria-label='account of current user'
      aria-haspopup='true'
      color='inherit'
    >
      <PermIdentityIcon fontSize='large' htmlColor={props.color} />
    </IconButton>

  )
}

export default profile
