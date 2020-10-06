import React from 'react'
import CasesList from '../../components/App/CasesList/CasesList'
import Header from '../../components/App/Header/Header'
import Search from '../../components/App/Search/Search'

const Cases = () => {
  return (
    <>
      <Header target='home' />
      <Search />
      <CasesList />
    </>
  )
}

export default Cases
