import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import CasesList from '../../components/App/Cases/CasesList/CasesList'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/App/Header/Header'
import Search from '../../components/UI/Search/CasesSearch/CasesSearch'
import { setup } from '../../services/Auth'
import { getUserById, getUserId } from '../../services/Users'
import { SET_USER } from '../../store/actions'

const Cases = () => {
  const dispatch = useDispatch()
  const current_user = useSelector((state) => (state.user.current_user))
  const [fetchUser, setFetchUser] = useState(false)

  const ResponseUser = async () => {
    const response = await getUserById(getUserId())

    if (Object.entries(response).length !== 0) {
      setFetchUser(true)
      dispatch({ type: SET_USER, datas: response.datas })
    }
  }

  useEffect(() => {
    if (!fetchUser && Object.entries(current_user).length < 1) {
      ResponseUser()
    }
  }, [fetchUser])

  if (setup()) {
    return (
      <>
        <Header target='home' />
        <Search />
        <CasesList />
      </>
    )
  } else {
    return (<Redirect to='/' />)
  }
}

export default Cases
