import './Home.scss'

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {JOB_LIST} from '../../store/actions'
import Register from '../../components/App/Auth/Register/Register'
import SignIn from '../../components/App/Auth/SignIn/SignIn'
import Status from '../../components/App/Auth/Status/Status'
import { fetchJobs } from '../../services/Jobs'
import Spinner from '../../components/UI/Dawers/Spinner'
import AuthHeader from "../../components/App/Auth/Header/AuthHeader";

const Home = () => {
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const loader = home.loader
  const user = useSelector((state) => state.user)
  const isLoaded = home.jobsLoaded


  var form = home.login ? <SignIn /> : <Register />

  if (user.subscribe === true) { form = <Status /> }

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
