import React from 'react'
import { Redirect } from 'react-router-dom'
import ModalGuidelinesPostCase from '../../components/Helper/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import { setup } from '../../services/Auth'

import Header from "../../components/App/Header/Header";
import New from '../../components/App/Cases/PostCase/Omnipratic/Omnipratic'

const CasePost = () => {

  if (setup()) {
    return (
      <>
        <Header />
        <ModalGuidelinesPostCase />
        <New/>
      </>
    )
  } else {
    return (<Redirect to='/' />)
  }
}

export default CasePost
