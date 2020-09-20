import React from 'react'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import IconButton from '@material-ui/core/IconButton'

const IconProfile = (props) => {

  const Img = () => {
    if (props.profileImg === undefined){
      return(
          <PermIdentityIcon fontSize='large' htmlColor={props.color} />
      )
    }
    return(
        <img src={props.profileImg}/>
    )
  }

  return (
    <IconButton
      aria-label='account of current user'
      aria-haspopup='true'
      color='inherit'
    >
      <Img/>
    </IconButton>
  )
}

export default IconProfile
