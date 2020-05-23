import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import IconButton from '@material-ui/core/IconButton'

const home = (props) => {

  if (props.target === 'home') {
    return (
      <IconButton color='inherit' aria-label='menu'>
        <HomeIcon fontSize='large' htmlColor={props.color} />
      </IconButton>
    )
  }
  return (
    <IconButton color='inherit' aria-label='menu'>
      <HomeOutlinedIcon fontSize='large' htmlColor={props.color} />
    </IconButton>
  )
}

export default home
