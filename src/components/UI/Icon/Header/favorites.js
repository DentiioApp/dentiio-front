import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import IconButton from '@material-ui/core/IconButton'
const favorites = (props) => {

  if (props.target === 'favorites') {
    return (
      <IconButton aria-label='favorite of current user' color='inherit'>
        <StarIcon fontSize='large' htmlColor={props.color} />
      </IconButton>
    )
  }
  return (
    <IconButton aria-label='favorite of current user' color='inherit'>
      <StarBorderIcon fontSize='large' htmlColor={props.color} />
    </IconButton>
  )
}

export default favorites
