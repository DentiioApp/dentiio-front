import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CardForm from '../../components/App/CardForm/cardForm'
import { cardCheck, JOB_LIST } from '../../store/actions'

import { fetchJobs } from '../../services/JobList'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const homeState = 'inscription'
  // const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
  const [jobs, setJobs] = useState([])
  var count=0

  useEffect(() => {
    const getJobs = fetchJobs()
    getJobs.then((res) => setJobs(res || {}))
  },[count])

  // wait(40*1000).then(() => {
  dispatch(cardCheck({ status: homeState }))
  dispatch({ type: JOB_LIST, data: jobs })
  // })

  return (
    <div className='App'>
      <CardForm />
    </div>
  )
}

export default Home
