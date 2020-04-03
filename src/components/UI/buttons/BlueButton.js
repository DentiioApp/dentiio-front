import './blueButton.scss'

import React from 'react'
import { useHistory } from "react-router-dom";

const BlueButton = (props) => {
  let history = useHistory();

  const catchClick = () => {
    history.push('/', { content: props.content})
  }

  return (
    <>
      <button onClick={catchClick} className='blue'>{props.content}</button>
    </>
  )
}

export default BlueButton
