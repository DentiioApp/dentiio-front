import React from 'react'
import IconButton from '@material-ui/core/IconButton'

const iconNotifSubject = (props) => {

  const Img = () => {
    if (props.profileImg === undefined){
      return(
          <></>
      )
    }
    return(
        <img src={props.profileImg}/>
    )
  }

  return (
    <IconButton
      aria-label='subject notif'
      aria-haspopup='true'
      color='inherit'
    >
      <Img/>
    </IconButton>
  )
}

export default iconNotifSubject
