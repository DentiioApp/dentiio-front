//import './Account.scss'

import React from 'react'
import { useSelector } from 'react-redux'

const Account = () => {
  const username = useSelector(state => state.username)
    console.log('OBJECT : ',username);
  var auth
/*
  if (username === '') {
    auth = <Auth />
  } else {
    auth = <Account />
  }
*/
  return (
    <>
        {auth}
    </>
  )
}

export default Account
