import './WhiteButton.scss'

import React from 'react'
import { useHistory } from 'react-router-dom'

const WhiteButton = (props) => {
  const history = useHistory()

  const catchClick = () => {
    history.push('/', { content: props.content })
  }

  return (
    <>
      <button onClick={catchClick} className='white'>{props.content}</button>
    </>
  )
}

export default WhiteButton
