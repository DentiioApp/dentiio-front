import React from 'react'
import './Auth.scss'
import SignUp from './../../components/App/signUp/SignUp'
import img from './../../images/auth.svg'

function Auth () {
  
  return (
    <>
      <div className='auth'>
        <img src={img} alt='alternative texte' />
        <div style={{width: '20rem'}}>
          <SignUp />
        </div>
      </div>
    </>
  )
}

export default Auth
