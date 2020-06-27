import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CardForm from '../../components/App/CardForm/cardForm'
import { cardCheck, JOB_LIST } from '../../store/actions'

import { fetchJobs } from '../../services/JobList'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
 
 const [jobs, setJobs] = useState([])
   var count = 0 ;
   useEffect((count) => {		 
    const getJobs = fetchJobs()	
    getJobs.then((res) => setJobs(res || {}))
   },[count])

  dispatch({ type: JOB_LIST, data: jobs })

  return (
    <div className='App'>
    </div>
  )
}

export default Home
