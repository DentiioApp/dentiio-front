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
import { fetchSpecialities, fetchPathologies, fetchKeywords, fetchTreatments, fetchSymptomes } from '../../services/Home'
import { SPECS_LIST, KEYWORDS_LIST, PATHO_LIST, TREATMENTS_LIST, SYMPTOMES_LIST } from '../../store/actions'

const CasePost = () => {
  const home = useSelector((state) => state.home)
  const level = home.level
  const specialities = home.specialities
  const keywords = home.keywords
  const pathologies = home.pathologies
  const treatments = home.treatments
  const symptomes = home.symptomes

  const dispatch = useDispatch()

  const getSpecialities = async () => {
    const specialitiesLoaded = await fetchSpecialities()
    dispatch({ type: SPECS_LIST, data: specialitiesLoaded.datas })
  }

  const getKeywords = async () => {
    const keywordsLoaded = await fetchKeywords()
    dispatch({ type: KEYWORDS_LIST, keywords: keywordsLoaded.datas })
  }

  const getPathologies = async () => {
    const pathologiesLoaded = await fetchPathologies()
    dispatch({ type: PATHO_LIST, data: pathologiesLoaded.datas })
  }

  const getTreatments = async () => {
    const treatmentsLoaded = await fetchTreatments()
    dispatch({ type: TREATMENTS_LIST, data: treatmentsLoaded.datas })
  }

  const getSymptomes = async () => {
    const symptomesLoaded = await fetchSymptomes()
    dispatch({ type: SYMPTOMES_LIST, data: symptomesLoaded.datas })
  }

  useEffect(() => {
    if (specialities && specialities.length < 1) { getSpecialities() }
    if (keywords && keywords.length < 1) { getKeywords() }
    if (pathologies && pathologies.length < 1) { getPathologies() }
    if (treatments && treatments.length < 1) { getTreatments() }
    if (symptomes && symptomes.length < 1) { getSymptomes() }
  })

  const initValues = {
    age: 0,
    gender: '',
    isASmoker: false,
    isAnAlcooler: false,

    is_medical_background: false,
    problem_health: '',

    exam_pics: [],
    exam_name: '',
    step: [],

    in_treatment: '',
    global_desc: '',
    medication_administered: [],
    treatments: [],
    treatment: [],
    intra_extra_oral_desc: '',

    diagnostic: '',

    evolution: '',

    conclusion: '',
    symptomes: [],
    title: '',
    summary: '',
    keywords: [],
    specialities: [],
    pathologies: [],
  }

  const [values, setValues] = useState(initValues)

  const handleChange = prop => event => {
    if (prop === 'isASmoker' || prop === 'is_medical_background' || prop === 'isAnAlcooler') { setValues({ ...values, [prop]: event.target.checked }) } 
    else { setValues({ ...values, [prop]: event.target.value }) }
  }

  let form

  switch (level) {
    case 'exam':
      form = <Exam onChange={handleChange} values={values} setValues={setValues} />
      break
    case 'diagnostic':
      form = <Diagnostic onChange={handleChange} values={values} />
      break
    case 'treatplan':
      form = <TreatPlan onChange={handleChange} values={values} />
      break
    case 'evolution':
      form = <Evolution onChange={handleChange} values={values} />
      break
    case 'conclusion':
      form = <Conclusion onChange={handleChange} values={values} />
      break
    case 'cliniccase':
      form = <ClinicCase onChange={handleChange} values={values} />
      break
    default:
      form = <Patient onChange={handleChange} values={values} />
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
