import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import CasesList from '../../components/App/Cases/CasesList/CasesList'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/App/Header/Header'
import Search from '../../components/UI/Search/CasesSearch/CasesSearch'
import { setup } from '../../services/Auth'
import { getUserById, getUserId } from '../../services/Users'
import { SET_USER } from '../../store/actions'
import Box from "@material-ui/core/Box";

const Cases = () => {
  const dispatch = useDispatch()
  const current_user = useSelector((state) => (state.user.current_user))
  const [fetchUser, setFetchUser] = useState(false)


  useEffect(() => {

    const ResponseUser = async () => {
      const response = await getUserById(getUserId())
      if (Object.entries(response).length !== 0) {
        setFetchUser(true)
        dispatch({ type: SET_USER, datas: response.datas })
      }
    }

    if (!fetchUser && Object.entries(current_user).length < 1) {ResponseUser()}
    }, [fetchUser, current_user, dispatch])

  if (setup()) {
    return (
        <>
          <Box bgcolor="background.paper">
            <Header target='home' />
            <Search />
            <CasesList />
          </Box>
        </>
    )
  } else {
    return (<Redirect to='/' />)
  }
}

export default Cases
