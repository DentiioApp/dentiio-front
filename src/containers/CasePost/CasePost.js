import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ModalGuidelinesPostCase from '../../components/Helper/Modal/ModalGuidelines-PostCase/ModalGuidelinesPostCase'
import Patient from '../../components/App/Cases/PostCase/Patient/Patient'
import Exam from '../../components/App/Cases/PostCase/Exam/Exam'
import Diagnostic from '../../components/App/Cases/PostCase/Diagnostic/Diagnostic'
import Evolution from '../../components/App/Cases/PostCase/Evolution/Evolution'
import ClinicCase from '../../components/App/Cases/PostCase/ClinicCase/ClinicCase'
import TreatPlan from '../../components/App/Cases/PostCase/TreatPlan/TreatPlan'
import TextField from '@material-ui/core/TextField'
import { setup } from '../../services/Auth'

import { fetchSpecialities, fetchPathologies, fetchKeywords, fetchTreatments, fetchSymptomes } from '../../services/Home'
import { SPECS_LIST, KEYWORDS_LIST, PATHO_LIST, TREATMENTS_LIST, SYMPTOMES_LIST } from '../../store/actions'
import PostCaseStepper from "../../components/UI/Steppers/PostCaseStepper";

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
    // Require for create patient but non in figma maquette
    is_medical_background: true,
    problemHealth: true,
    in_treatment: 'true',

    // Information du patient
    age: '',
    gender: '',
    isASmoker: false,
    isDrinker: false,
    medical_background: [],
    current_treatments: [],
    allergies: '',
    reason_consultation: '',

    // Examen clinique
    exam_pics: [],
    pictures_clinic_exam: [],
    intra_extra_oral_desc: '',
    symptomes: [],

    // Examen complementaire
    extra_exam_name: '',
    extra_exam_pictures: '',
    extra_exam_desc: '',
    scanner_desc: '',
    scanner_pics: [],
    biopsy_desc: '',
    biopsy_pics: [],
    moulage_desc: '',
    moulage_pics: [],
    teleradio_desc: '',
    teleradio_pics: [],


    // Dagnostic
    diagnostic: '',
    pathologies: [],
    medication_administered: [],

    // Plan de traitement
    step1: "",
    step1Pics: [],
    step2: "",
    step2Pics: [],
    step3: "",
    step3Pics: [],

    // Evolution
    evolution_pics: [],
    evolution: '',

    // Conclusion
    conclusion: '',

    // Add clinical case
    title: '',
    summary: '',
    keywords: [],
    specialities: [],

    treatment: []
  }

  const [values, setValues] = useState(initValues)
  const [inCrement, setInCrement] = useState(1)

  const handleChange = prop => event => {
    if (prop === 'isASmoker' || prop === 'isDrinker') { setValues({ ...values, [prop]: event.target.checked }) } else if (prop === 'old_injury') {
      function addFields () {
        var container = document.getElementById('fieldset_old_injury')
        // Clear previous contents of the container
        /* while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            } */

        // Append a node with a random text
        var newDiv = document.createElement('div')
        newDiv.setAttribute('id', 'node_old_injury' + inCrement)

        //   texField.setAttribute("label","minimum height")
        //   texField.setAttribute("placeholder","Antecedent medicaux")
        //   texField.setAttribute("variant","outlined")
        //   texField.setAttribute("label","Antecedent medicaux")
        //   texField.setAttribute("multilined",true)
        //   texField.setAttribute("fullWidth",true)
        newDiv.append(React.createFactory('TexField', <TextField label='Combo box' variant='outlined'>jj</TextField>))

        container.appendChild(newDiv)
        // Create an <input> element, set its type and name attributes
        /*

            var input = document.createElement("input");
            input.type = "text";
            input.name = "member" + i;
            container.appendChild(input);

            */
        // Append a line break
        container.appendChild(document.createElement('br'))
        setInCrement(inCrement + 1)
      }
      addFields()
      setValues({ ...values, [prop]: event.target.value })
    } else { setValues({ ...values, [prop]: event.target.value }) }
  }

  let form

  switch (level) {
    case 'exam':
      form = <Exam onChange={handleChange} values={values} />
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
    case 'cliniccase':
      form = <ClinicCase onChange={handleChange} values={values} />
      break
    default:
      form = <Patient onChange={handleChange} values={values} />
  }

  if (setup()) {
    return (
      <>
        <ModalGuidelinesPostCase />
        <PostCaseStepper/>
        {form}
      </>
    )
  } else {
    return (<Redirect to='/' />)
  }
}

export default CasePost
