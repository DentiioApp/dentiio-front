import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ModalGuidelinesPostCase from '../../components/Helper/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import TextField from '@material-ui/core/TextField'
import { setup } from '../../services/Auth'

import { fetchSpecialities, fetchPathologies, fetchKeywords, fetchTreatments, fetchSymptomes } from '../../services/Home'
import { SPECS_LIST, KEYWORDS_LIST, PATHO_LIST, TREATMENTS_LIST, SYMPTOMES_LIST } from '../../store/actions'
import Header from "../../components/App/Header/Header";
import New from '../../components/App/Cases/PostCase/Omnipratic/Omnipratic'

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
