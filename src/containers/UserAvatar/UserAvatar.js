import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../../components/App/Header/Header'
import { setup } from '../../services/Auth'
import TabAvatar from './Tab'

const UserAvatar = () => {
  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header target='profile' />
      <TabAvatar />
    </>
  )
}

export default UserAvatar
