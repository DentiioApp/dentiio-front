import './Home.scss'

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {JOB_LIST, SET_NEW_USER} from '../../store/actions'
import Register from '../../components/App/Auth/Register/Register'
import SignIn from '../../components/App/Auth/SignIn/SignIn'
import Status from '../../components/App/Auth/Status/Status'
import { fetchJobs } from '../../services/Jobs'
import Spinner from '../../components/UI/Dawers/Spinner'
import AuthHeader from "../../components/App/Auth/Header/AuthHeader";
import {checkEmail, checkPassword} from "../../utils";

const Home = () => {
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const loader = home.loader
  const user = useSelector((state) => state.user)
  const newuser = useSelector((state) => state.newUser)
  console.log(newuser,'user')
  const isLoaded = home.jobsLoaded
  const [error, setError] = useState({
    email: false,
    password: false
  })


  const initValues = {
    pseudo: '',
    email: '',
    password: '',
    licenceDoc: '',
    specialities: [],
    job: '',
    showPassword: false
  }

  const [values, setValues] = useState(initValues)
  console.log(values)
  const handleChange = prop => event => {
    if (prop === 'email') {
      (checkEmail(event.target.value) === false) ?
          setError({ ...error, 'email': true}) : setError({ ...error, 'email': false})
      }
    if (prop === 'password') {
      (checkPassword(event.target.value) === false) ?
          setError({ ...error, 'password': true}) : setError({ ...error, 'password': false})
      }
    setValues({ ...values, [prop]: event.target.value })
    dispatch({ type: SET_NEW_USER, datas: values })
  }

  var form = home.login ? <SignIn /> : <Register onChange={handleChange} error={error} values={values} />

  if (user.subscribe === true) { form = <Status onChange={handleChange} values={values} /> }

  if (loader === true) { form = <Spinner /> }


  const loadJobs = async () => {
    const jobs = await fetchJobs()
    if (jobs !== {}) { dispatch({ type: JOB_LIST, data: jobs.datas }) }
  }

  useEffect(() => {
    if (!isLoaded) {
      loadJobs()
    }
  })

  return (
    <div className='App'>
      <AuthHeader/>
      {form}
    </div>
  )
}

export default Home
