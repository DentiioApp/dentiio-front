import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/App/Header/Header'
import ModalGuidelinesPostCase from '../../components/App/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import Patient from '../../components/App/Patient/Patient'
import Exam from '../../components/App/Exam/Exam'
import Evolution from '../../components/App/Evolution/Evolution'
import Conclusion from '../../components/App/Conclusion/Conclusion'
import ClinicCase from '../../components/App/ClinicCase/ClinicCase'

const CasePost = () => {
  const home = useSelector((state) => state.home)
  const initValues = {
    age: 0,
    gender: '',
    isSmoker: false,
    is_medical_background: false,
    problem_health: '',
    in_treatment: '',

    intra_extra_oral_desc: '',

    diagnostic: '',

    evolution: '',

    conclusion: '',
    
    title: '',
    summary: '',
    keywords: [],
    specialities: [],
  }

  const [values, setValues] = useState(initValues)
  const form =  <Patient setvalue={setValues} values={values} />

  return (
    <>
      <Header />
      <ModalGuidelinesPostCase />
      {form}

    </>
  )
}

export default CasePost
