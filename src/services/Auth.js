export const logout = () => {
  window.localStorage.removeItem('authToken')
  localStorage.clear()
  delete axios.defaults.headers.Authorization
}

// Verifie si un token existe dans le localStorage
export const setup = () => {
  const token = window.localStorage.getItem('authToken')

  if (token) {
    const jwtData = jwtDecode(token)
    if (jwtData.exp * 1000 > new Date().getTime()) {
      
    } else {
      logout()
    }
  } else {
    logout()
  }
}