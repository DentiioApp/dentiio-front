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
      margin: '13px 23px 0px 50px'
    },

    login: {
      height: 'fit-content',
      position: 'absolute',
      marginTop: '0%',
      top: '4%',
      right: '0',
      borderRadius: '20px',
      marginRight: '10%',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'inherit',
        marginTop: '25%'
      }
    }
  }
}

export default oStyle
