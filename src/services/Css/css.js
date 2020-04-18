export const oStyle = (theme, img) => {
  return (
    {
      root: {
        height: '85vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%'
      },
      image: {
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light'
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
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
      }
    }
  )   
}

export default oStyle