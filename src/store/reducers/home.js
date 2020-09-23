
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
  nbrCases: 1,

  login: false,
  status: false,
  config: { conf },
  internet: false,

  keywords: [],
  specialities: [],
  treatments: [],
  pathologies: [],
  symptomes: [],
  level: ''
}

export const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_FORM': return { ...state, login: true }
    case 'STATUS_FORM': return { ...state, status: true }

    case 'JOB_LIST': return { ...state, jobs: action.data, jobsLoaded: true }
    case 'CASES_LIST' : return { ...state, cases: action.datas, casesLoaded: true, nbrCases: action.nbrItems }
    case 'KEYWORDS_LIST': return { ...state, keywords: action.keywords }

    case 'HOME_RESET': return { ...state, usersLoaded: false, casesLoaded: false, jobsLoaded: false }
    case 'LOAD_INTERNET': return { ...state, internet: navigator.onLine }

    case 'UPDATE_LEVEL': return { ...state, level: action.level }
    case 'SPECS_LIST': return { ...state, specialities: action.data }
    case 'TREATMENTS_LIST' : return { ...state, treatments: action.data }
    case 'PATHO_LIST' : return { ...state, pathologies: action.data }
    case 'SYMPTOMES_LIST' : return { ...state, symptomes: action.data }
    default:
      return state
  }
}
