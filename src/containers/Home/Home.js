import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import  {Register }from '../../Components/App/Register/register'
import SignIn from '../../Components/App/SignIn/signIn'
import {JOB_LIST} from '../../store/actions'
import { fetchJobs } from '../../services/JobList'
import './Home.scss' 

const Home = () => {
  const dispatch = useDispatch({type:"CARD_STATE", })
  const home = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)

  const [jobs, setJobs] = useState([])
  var count=0

  useEffect(() => {
    const getJobs = fetchJobs()
    getJobs.then((res) => setJobs(res || {}))
  },[count])

  dispatch({ type: JOB_LIST, data: jobs })
 
  var auth = <Register />

  if (home.status === 'connexion' || user.subscribe === true) {
    auth = <SignIn />
  }

  return (
    <>
      {auth}
    </>
  )
}

export default Home
