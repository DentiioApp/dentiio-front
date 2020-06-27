const INIT_STATE = {
  navBarOpen: "",
  loadingJobs: false,
  jobsLoaded: false,
  jobs: [],

  //ALL USERS
  loadingUsers: false,
  usersLoaded: false,
  users: [],

  //AN USERS
  loadingUser: false,
  userLoaded: false,
  user: {},

  cases: [],
  login: false,
};

export const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
  case "LOGIN_FORM":
      return { ...state, login: true };

    case "JOB_LIST":
      return { ...state, jobs: action.data, jobsLoaded:true };

    default:
      return state;
  }
};
