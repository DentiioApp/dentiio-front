import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_LIST } from '../../store/actions'
import Register from '../../components/App/Register/Register'
import SignIn from '../../components/App/SignIn/SignIn'

import { tryJobs } from '../../services/Jobs'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const isLoaded = home.jobsLoaded
  const form = home.login ? <SignIn /> : <Register />

  useEffect(() => {
    if (!isLoaded) {
      const getJobs = tryJobs()
      getJobs.then(response =>{ 
        if(response.message === 'Network error') {
          console.warn('jobs unsets from')
        }else{
          const disp = getJobs.then((res) => ({ type: JOB_LIST, data: res.datas, notif: res.message }))
          disp.then((act) => { dispatch(act) })
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
