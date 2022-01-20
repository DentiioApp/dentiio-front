import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ConnexionTitleHeader from "../../../UI/titleHeader/ConnexionTitleHeader";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { LOGIN_FORM, /*BACK_LOGIN_FORM, SUBSCRIBE_FORM*/} from "../../../../store/actions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    position: 'relative',
    marginBottom: '90px',
    zIndex: 1
  },
  menuButton: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    textTransform: 'capitalize',
    fontWeight: '600'
  },
  title: {
    flexGrow: 1,
  },
}));


export const AuthHeader = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // const switchToSubscribe = (e) => {
  //   e.preventDefault()
  //   dispatch({type: BACK_LOGIN_FORM})
  //   dispatch({ type: SUBSCRIBE_FORM })
  // }

  const switchToLogin = (e) => {
    e.preventDefault()
    dispatch({ type: LOGIN_FORM })
  }

  return (
      <>
      <AppBar position="static" color="transparent" elevation={0} className={classes.root}>
        <Toolbar>
          <ConnexionTitleHeader className={classes.title} />
          <Typography variant="h6" className={classes.title}>
          </Typography>
          {/*<Button onClick={(e) => switchToSubscribe(e)} className={classes.menuButton} color='primary' size='large' >Inscription</Button>*/}
          <Button onClick={(e) => switchToLogin(e)} className={classes.menuButton} color='primary' size='large' >Connexion</Button>
        </Toolbar>
      </AppBar>

      </>
  )
}

export default AuthHeader
