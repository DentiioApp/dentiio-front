
import conf from '../../config'

const INIT_STATE = {
  navBarOpen: '',

  loadingJobs: false,
  jobsLoaded: false,
  jobs: [],

  loadingUsers: false,
  usersLoaded: false,
  users: [],

  loadingCases: false,
  casesLoaded: false,
  cases: [],

  login: false,
  config: { conf }
}

export const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_FORM':
      return { ...state, login: true }

    case 'JOB_LIST':
      return { ...state, jobs: action.data, jobsLoaded: true }

    case 'CASES_LIST' :
      return { ...state, cases: action.datas, casesLoaded: true }

    case 'HOME_RESET': return { ...state, usersLoaded: false, casesLoaded: false, jobsLoaded: false }

    default:
      return state
  }
}
