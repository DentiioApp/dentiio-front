import React from 'react'
import './BlueButton.scss'

function blueButton (props) {
  return (
    <>
      <button className='blue'>{props.content}</button>
    </>
  )
}

export default blueButton
