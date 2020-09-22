import React from 'react'
import Header from '../../components/App/Header/Header'
import ModalGuidelinesPostCase from "../../components/App/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase";

const CasePost = () => {
const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES
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
    /*"user": {
      "email": "string",
      "nom": "string",
      "prenom": "string",
      "pseudo": "string",
      "roles": [
        "string"
      ],
      "password": "string",
      "licenceDoc": "string",
      "clinicalCase": [
        "string"
      ],
      "notations": [
        "string"
      ],
      "commentaires": [
        "string"
      ],
      "isEnabled": true,
      "job": {
        "name": "string",
        "ident": "string",
        "users": [
          null
        ]
      },
      "favorites": [
        "string"
      ],
      "speciality": [
        {
          "name": "string",
          "users": [
            "string"
          ],
          "clinicalCases": [
            "string"
          ]
        }
      ],
      "createdAt": "2020-09-22T09:09:37.518Z",
      "notificationsSend": [
        "string"
      ],
      "notificationsReceive": [
        "string"
      ]
    },*/
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
    /*
    "speciality": [
      {
        "name": "string",
        "users": [
          "string"
        ],
        "clinicalCases": [
          "string"
        ]
      }
    ],*/
    title: "Titrrreeeeeee",
    slug: "sluuuuuuggguueeee",
    /*
    "notifications": [
      "string"
    ],
    "imageClinicalCases": [
      "string"
    ],*/
    keyword: ["/api/keywords/"+66]
  }

  const postCase = () => {
    //console.log('FAV SERvice :', iUser, iItem)
    const reponses = axios
      .post(CLINICAL_CASES, item)
      .then((res) => ({
        message: 'OK',
        datas: res.data['hydra:member']
      }))
      .catch((e) => JSON.stringify(e))
    return reponses
  } 
  postCase()
  return (
    <>
      <Header/>
      <ModalGuidelinesPostCase/>
    </>
  )
}

export default CasePost
