import './Home.scss'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {JOB_LIST} from '../../store/actions'
import Register from '../../components/App/Auth/Register/Register'
import SignIn from '../../components/App/Auth/SignIn/SignIn'
import Status from '../../components/App/Auth/Status/Status'
import { fetchJobs } from '../../services/Jobs'
import AuthHeader from "../../components/App/Auth/Header/AuthHeader";

const Home = () => {
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)
  const isLoaded = home.jobsLoaded

  const Form = () => {
    if (user.subscribe === true) {
      return <Status />
    } else {
      return home.login ? <Register /> : <SignIn />
    }
  }

  const loadJobs = async () => {
    const jobs = await fetchJobs()
    if (jobs !== {}) { dispatch({ type: JOB_LIST, data: jobs.datas }) }
  }

  useEffect(() => {
    if (!isLoaded) {
      loadJobs().then()
    }
  })

  return (
    <div className='App'>
      <AuthHeader/>
      <Form/>
    </div>
  )
}

export default Home
