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

      '@media (max-width:1025px)': {
        backgroundSize: 'cover',

        '@media (max-width:767px)': {
          backgroundImage: `url(${imgMobile})`,
          backgroundSize: 'cover'

        }
      }
    },

    paper: {
      margin: theme.spacing(5, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      width: '15%'
      // backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    GradientBtn: {
      margin: theme.spacing(3, 0, 2)
    },

    logo: {
      position: 'absolute',
      margin: '13px 23px 0px 32px'
    },

    login: {
      height: 'fit-content',
      position: 'absolute',
      top: '8%',
      bottom: '0',
      right: '0',
      borderRadius: '20px',
      marginRight: '10%',

      '@media (max-width:1025px)': {
        margin: 'auto',
        position: 'inherit'
      }
    }
  }
}

export default oStyle
