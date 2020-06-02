import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
const favorites = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory()

  if (props.target === 'favorites') {
    return (
      <IconButton aria-label='favorite of current user' color='inherit'>
        <StarIcon fontSize='large' htmlColor={props.color} />
      </IconButton>
    )
  }
  return (
    <IconButton onClick={() => history.push('/favorites')} aria-label='favorite of current user' color='inherit'>
      <StarBorderIcon fontSize='large' htmlColor={props.color} />
    </IconButton>
  )
}

export default favorites
