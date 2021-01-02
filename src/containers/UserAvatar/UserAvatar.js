import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../../components/App/Header/Header'
import { setup } from '../../services/Auth'
import TabAvatar from './Tab'
import Box from "@material-ui/core/Box";

const UserAvatar = () => {
  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
        <Box bgcolor="background.paper">
          <Header target='profile' />
          <TabAvatar />
        </Box>
    </>
  )
}

export default UserAvatar
