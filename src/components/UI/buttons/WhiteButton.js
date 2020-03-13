import React from 'react'
import './WhiteButton.scss'

function whiteButton (props) {
  return (
    <>
      <button className='white'>{props.content}</button>
    </>
  )
}

export default whiteButton
