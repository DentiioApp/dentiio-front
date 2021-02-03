import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ModalGuidelinesPostCase from '../../components/Helper/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import { setup } from '../../services/Auth'

import Header from "../../components/App/Header/Header";
import New from '../../components/App/Cases/PostCase/Omnipratic/Omnipratic'

const CasePost = () => {
  // const specialities = home.specialities
  // const keywords = home.keywords
  // const pathologies = home.pathologies
  // const treatments = home.treatments
  // const symptomes = home.symptomes

  // const dispatch = useDispatch()

  // const getSpecialities = async () => {
  //   const specialitiesLoaded = await fetchSpecialities()
  //   dispatch({ type: SPECS_LIST, data: specialitiesLoaded.datas })
  // }

  // const getKeywords = async () => {
  //   const keywordsLoaded = await fetchKeywords()
  //   dispatch({ type: KEYWORDS_LIST, keywords: keywordsLoaded.datas })
  // }

  // const getPathologies = async () => {
  //   const pathologiesLoaded = await fetchPathologies()
  //   dispatch({ type: PATHO_LIST, data: pathologiesLoaded.datas })
  // }

  // const getTreatments = async () => {
  //   const treatmentsLoaded = await fetchTreatments()
  //   dispatch({ type: TREATMENTS_LIST, data: treatmentsLoaded.datas })
  // }

  // const getSymptomes = async () => {
  //   const symptomesLoaded = await fetchSymptomes()
  //   dispatch({ type: SYMPTOMES_LIST, data: symptomesLoaded.datas })
  // }

  useEffect(() => {
    // if (specialities && specialities.length < 1) { getSpecialities() }
    // if (keywords && keywords.length < 1) { getKeywords() }
    // if (pathologies && pathologies.length < 1) { getPathologies() }
    // if (treatments && treatments.length < 1) { getTreatments() }
    // if (symptomes && symptomes.length < 1) { getSymptomes() }
  })

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
