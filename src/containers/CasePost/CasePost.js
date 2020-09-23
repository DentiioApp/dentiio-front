import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/App/Header/Header'
import ModalGuidelinesPostCase from '../../components/App/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import Patient from '../../components/App/Patient/Patient'
import Exam from '../../components/App/Exam/Exam'
import Diagnostic from '../../components/App/Diagnostic/Diagnostic'
import Evolution from '../../components/App/Evolution/Evolution'
import Conclusion from '../../components/App/Conclusion/Conclusion'
import ClinicCase from '../../components/App/ClinicCase/ClinicCase'
import TreatPlan from '../../components/App/TreatPlan/TreatPlan'
import {fetchSpecialities, fetchPathologies, tryKeywords, fetchTreatments} from '../../services/Home'
import {SPECS_LIST, KEYWORDS_LIST, PATHO_LIST, TREATMENTS_LIST} from '../../store/actions'

const CasePost = () => {
  const home = useSelector((state) => state.home)
  const level = home.level
  const specialities = home.specialities
  const keywords = home.keywords
  const pathologies = home.pathologies
  const treatments = home.treatments
  const dispatch = useDispatch()

  const getSpecialities = async() => {
    const specialitiesLoaded = await fetchSpecialities()
    console.log('SPECS_LIST :', specialitiesLoaded)
    dispatch({type: SPECS_LIST, data:specialitiesLoaded})
  }

  const getKeywords = async() => {
    const keywordsLoaded = await tryKeywords()
    console.log('KEYWORDS_LIST :', keywordsLoaded)
    dispatch({type: KEYWORDS_LIST, data:keywordsLoaded})
  }

  const getPathologies = async() => {
    const pathologiesLoaded = await fetchPathologies()
    console.log('PATHO_LIST :', pathologiesLoaded)
    dispatch({type: PATHO_LIST, data: pathologiesLoaded})
  }

  const getTreatments = async() => {
    const treatmentsLoaded = await fetchTreatments()
    console.log('TREATMENTS_LIST :', treatmentsLoaded)
    dispatch({type: TREATMENTS_LIST, data: treatmentsLoaded})
  }

  useEffect(() => {
    if (specialities.length < 1) {const loadSpecialities = getSpecialities()}
    if (keywords.length < 1) {const loadKeywords = getKeywords()}
    if (pathologies.length < 1) {const loadPathologies = getPathologies()}
    if (treatments.length < 1) {const loadTreatments = getTreatments()}

  })
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
