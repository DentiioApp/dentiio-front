import { createTheme } from '@material-ui/core/styles'

function User (){
  return 'light'
}

const ColorTheme = createTheme({
  palette: {
    // FOR DARK MODE
    type: User(),
    primary: {
      main: '#03B6F0',
      light: '#fff'
    },
    secondary: {
      main: '#f50057'
    }
  },
  overrides: {
    MuiTypography: {
      colorTextPrimary: { color: 'grey', fontSize: '12px' }

    }
  }
})

export default ColorTheme
