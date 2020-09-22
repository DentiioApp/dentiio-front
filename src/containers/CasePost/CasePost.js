import React from 'react'
import Header from '../../components/App/Header/Header'
import ModalGuidelinesPostCase from "../../components/App/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase";

const CasePost = () => {
  const item = 
  {
    age: 0,
    smoking: true,
    presentation: "hgkgkhg",
    treatmentPlan: "jctttttt",
    observation: "zzzzzzz",
    evolution: "aaaaaaaa",
    conclusion: "ssssssssssss",
    createdAt: "2020-09-22T09:09:37.518Z",
    notations: ["/api/notations/"+9754],
   
    isEnabled: true,
    patient: {
      age: 0,
      gender: "Monsieur",
      isASmoker: true,
      isMedicalBackground: true,
      problemHealth: "yes",
      inTreatment: "yes"
    },
    symptome: ["/api/symptomes/"+66],
    treatment: ["/api/treatments/"+40],
    pathologie: ["/api/pathologies/"+40],
    /*"speciality": ["/api/specialities/"+<number>, /api/specialities/"+<number>],*/
    title: "Titrrreeeeeee",
    slug: "sluuuuuuggguueeee",
    /*
    "imageClinicalCases": [
      "string"
    ],*/
    keyword: ["/api/keywords/"+66]
  }

  //postCase(item)

  return (
    <>
      <Header/>
      <ModalGuidelinesPostCase/>
    </>
  )
}

export default CasePost
