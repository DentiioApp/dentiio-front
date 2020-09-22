import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/App/Header/Header'
import ModalGuidelinesPostCase from '../../components/App/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import Patient from '../../components/App/Patient/Patient'
// import CasePost from '../../components/App/CasePost/CasePost';

const CasePost = () => {
  const home = useSelector((state) => state.home)
  const patient = home.patient
  const form = patient ? <CasePost /> : <Patient />

  return (
    <>
      <Header />
      <ModalGuidelinesPostCase />
      {form}

    </>
  )
}

export default CasePost
