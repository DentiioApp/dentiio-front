import React, {useState} from 'react'
import './whiteButton.scss'

import { Redirect } from "react-router-dom";

const WhiteButton = (props) => {
  const [value, setValue] = useState('');
  
  const catchClick = () => {
    setValue('redirect')
  }
  var action = '';

  (props.content === 'signin' ? action = 'register' : action = 'signin');

  if(value === 'redirect' ){
    return <Redirect to={{ pathname:"/", state: { do: action } }} />
  }

  return (
    <>
      <button onClick={catchClick} className='white' >{props.content}</button>
    </>
  )
}

export default WhiteButton
