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

  let form

  switch (level) {
    case 'exam':
      form = <Exam setvalue={setValues} values={values} />
      break;
    case 'diagnostic':
      form= <Diagnostic setvalue={setValues} values={values} />
      break;
    case 'treatplan':
      form= <TreatPlan setvalue={setValues} values={values} />
      break;
    case 'evolution':
      form= <Evolution setvalue={setValues} values={values} />
      break;
    case 'conclusion':
      form= <Conclusion setvalue={setValues} values={values} />
      break;
    case 'cliniccase':
      form= <ClinicCase setvalue={setValues} values={values} />
      break;
    default:
      form= <Patient setvalue={setValues} values={values} />
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
