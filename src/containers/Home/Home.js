import React, { useState, useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { JOB_LIST } from '../../store/actions'
import Register from '../../components/App/Register/register'
import SignIn from '../../components/App/SignIn/signIn'

import { fetchJobs } from '../../services/JobList'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)

  const form = home.login ? <Register /> : <SignIn />

  const [jobs, setJobs] = useState([])
  var count = 0 ;

  useEffect((count) => {		 
    const getJobs = fetchJobs()	
    getJobs.then((res) => setJobs(res || {}))
  },[count])

 // dispatch({ type: JOB_LIST, data: jobs })

  return (
    <div className='App'>
      {form}
    </div>
  )
}

export default Home
