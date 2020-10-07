import './Home.scss'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_LIST } from '../../store/actions'
import Register from '../../components/App/Register/Register'
import SignIn from '../../components/App/SignIn/SignIn'
import Status from '../../components/App/Status/Status'
import { fetchJobs } from '../../services/Jobs'

const Home = () => {
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)
  const isLoaded = home.jobsLoaded
  var form = home.login ? <Register /> : <SignIn />

  if (user.subscribe === true) {
    form = <Status />
  }

  const loadJobs = async () => {
    let jobs = await fetchJobs()
    if (jobs !== {})
      dispatch({ type: JOB_LIST, data: jobs.datas })
  }

  useEffect(() => {
    if (!isLoaded && home.login) {
      loadJobs()
    }
  })

  return (
    <div className='App'>
      {form}
    </div>
  )
}

export default Home
