import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/App/Header/Header'
import ModalGuidelinesPostCase from '../../components/App/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import Patient from '../../components/App/Patient/Patient'
import Exam from '../../components/App/Exam/Exam'
import Diagnostic from '../../components/App/Diagnostic/Diagnostic'
import Evolution from '../../components/App/Evolution/Evolution'
import Conclusion from '../../components/App/Conclusion/Conclusion'
import ClinicCase from '../../components/App/ClinicCase/ClinicCase'
import TreatPlan from '../../components/App/TreatPlan/TreatPlan'

const CasePost = () => {
  const home = useSelector((state) => state.home)
  const level = home.level
  const initValues = {
    age: 0,
    gender: '',
    isSmoker: false,

    is_medical_background: false,
    problem_health: '',

    in_treatment: '',
    global_desc: '',
    medication_administered: [],
    step: [],

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

  const handleChange = prop => event => {
    if (prop === 'isSmoker' || prop === 'is_medical_background') { setValues({ ...values, [prop]: event.target.checked }) } 
    else { setValues({ ...values, [prop]: event.target.value }) }
  }

  let form
console.log('values :', values)
  switch (level) {
    case 'exam':
      form = <Exam onChange={handleChange} values={values} />
      break;
    case 'diagnostic':
      form= <Diagnostic onChange={handleChange} values={values} />
      break;
    case 'treatplan':
      form= <TreatPlan onChange={handleChange} values={values} />
      break;
    case 'evolution':
      form= <Evolution onChange={handleChange} values={values} />
      break;
    case 'conclusion':
      form= <Conclusion onChange={handleChange} values={values} />
      break;
    case 'cliniccase':
      form= <ClinicCase onChange={handleChange} values={values} />
      break;
    default:
      form= <Patient onChange={handleChange} values={values} />
  }
  

  return (
    <>
      <Header />
      <ModalGuidelinesPostCase />
      
      {form}

    </>
  )
}

export default CasePost
