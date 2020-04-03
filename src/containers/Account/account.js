//import './Account.scss'

import React from 'react'
import { useSelector } from 'react-redux'

const Account = () => {
  const user = useSelector(state => state.user)
 
  return (
    <>
        {user.username}
    </>
  )
}

export default Account
