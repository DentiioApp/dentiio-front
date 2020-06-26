const INIT_STATE = {
  navBarOpen: "",
  //ALL USERS
  loadingUsers: false,
  usersLoaded: false,
  users: [],

  //AN USERS
  loadingUser: false,
  userLoaded: false,
  user: {},
  
  cases: [],
  status:'inscription'
}

export const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'CARD_STATE' :
      return {
        status: action.homeState
      }

    case 'JOB_LIST' :
      return {
        ...state,
        jobs: action.data
      }

    default :
      return state
  }
}
