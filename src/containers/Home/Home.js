import './Home.scss'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_LIST } from '../../store/actions'
import Register from '../../components/App/Register/Register'
import SignIn from '../../components/App/SignIn/SignIn'
import Status from '../../components/App/Status/Status'
import { tryJobs } from '../../services/Jobs'

const Home = () => {
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)
  const isLoaded = home.jobsLoaded
  var form = home.login ? <SignIn /> : <Register />

  if(user.subscribe && !home.status) {
    form = <Status />
  }

  useEffect(() => {
    if (!isLoaded) {
      const getJobs = tryJobs()
      getJobs.then(response => {
        if (response.message !== 'Network error' && response.message !== undefined) {
          getJobs.then((res) => (dispatch({ type: JOB_LIST, data: res.datas })))
        } 
      })
    }
  })

  return (
    <div className='App'>
      {form}
    </div>
  )
}

export default Home
