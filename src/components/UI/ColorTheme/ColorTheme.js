import { createMuiTheme } from '@material-ui/core/styles'

const ColorTheme = createMuiTheme({
  palette: {
    // FOR DARK MODE
    //type: 'dark',
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
