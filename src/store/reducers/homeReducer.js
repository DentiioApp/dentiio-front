
import {_config} from '../../config/index'

const INIT_STATE = {
  loader: false,

  jobsLoaded: false,
  jobs: [],

  users: [],

  login: false,
  config: { _config },
  internet: false,

  keywords: [],
  specialities: [],
  treatments: [],
  pathologies: [],
  symptomes: [],
  level: '',
  levelStepperPostCase: 0,
}

export const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'START_LOADER': return { ...state, loader: true }
    case 'STOP_LOADER': return { ...state, loader: false }
    case 'LOGIN_FORM': return { ...state, login: false }
    case 'SUBSCRIBE_FORM': return { ...state, login: true }
    case 'JOB_LIST': return { ...state, jobs: action.data, jobsLoaded: true }
    case 'KEYWORDS_LIST': return { ...state, keywords: action.keywords }
    case 'HOME_RESET': return { ...state, usersLoaded: false, casesLoaded: false, jobsLoaded: false }
    case 'LOAD_INTERNET': return { ...state, internet: navigator.onLine }
    case 'UPDATE_LEVEL': return { ...state, level: action.level }
    case 'UPDATE_STEPPER_POSTCASE': return { ...state, levelStepperPostCase: action.levelStepperPostCase }
    case 'SPECS_LIST': return { ...state, specialities: action.data }
    case 'TREATMENTS_LIST' : return { ...state, treatments: action.data }
    case 'PATHO_LIST' : return { ...state, pathologies: action.data }
    case 'SYMPTOMES_LIST' : return { ...state, symptomes: action.data }
    default:
      return state
  }
}
