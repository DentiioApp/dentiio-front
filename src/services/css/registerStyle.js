import { red } from '@material-ui/core/colors'

export const oStyle = (theme, imgDesktop, imgMobile) => {
  return {
    root: {
      height: '100vh',
      backgroundImage: `url(${imgDesktop})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
                theme.palette.type === 'light'
                  ? theme.palette.grey[50]
                  : theme.palette.grey[900],
      backgroundSize: 'contain',
      overflow: 'hidden',

      '@media (max-width:768px)': {
        backgroundImage: `url(${imgMobile})`,
        backgroundSize: 'cover'
      }
    },

    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    GradientBtn: {
      margin: theme.spacing(3, 0, 2)
    },

    formContainer: {
      marginLeft: '60%',
      marginRight: '6%',

      '@media (max-width:768px)': {
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },

    login: {
      borderRadius: '10%',
      backgroundColor: 'red'
    }

  }
}

export default oStyle
