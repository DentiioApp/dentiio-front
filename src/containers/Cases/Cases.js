import React from 'react'
import { Redirect } from 'react-router-dom'
import CasesList from '../../components/App/CasesList/CasesList'
import Header from '../../components/App/Header/Header'
import Search from '../../components/App/Search/Search'
import { setup } from '../../services/Auth'

const Cases = () => {
  if (setup()){
    return (
      <>
        <Header target='home' />
        <Search />
        <CasesList />
      </>
    )
  } else {
    return (<Redirect to="/" />)
  }
}

export default Cases
