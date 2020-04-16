import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom"
import "./register.scss";

import {
  Avatar,
  CssBaseline,
  FormControlLabel,
  Paper,
  Typography,
} from "@material-ui/core/"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import FormHelperText from '@material-ui/core/FormHelperText'
import img from "../../../images/auth.svg"
import { registerUser } from "../../../store/actions"
import GradientBtn from "../../UI/buttons/GradientBtn"
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'

// API DATAS
const currencies = [
  {
    value: "CD",
    label: "Chirurgien Dentiste",
  },
  {
    value: "DI",
    label: "Dentiste Interne",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "85vh",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
  image: {
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  GradientBtn: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const initValues = {
    pseudo: "",
    email: "",
    password: "",
    function: "",
    showPassword: false,
    cgu: false,
  };

  const [values, setValues] = useState(initValues);
  const [errEmail, setErrEmail] = useState("Dupont@dupont.fr");
  const [errPassword, setErrPassword] = useState(false);
  const [errPseudo, setErrPseudo] = useState(false);
  const [errCgu, setErrCgu] = useState(false);

  const catchSubmit = (e) => {
    e.preventDefault();

    if (values.password === '' && values.function === '' && values.pseudo === '') { return false }
    if (checkEmail(values.email) === false) { setErrEmail(true) ; return false; }
    if (checkPassword(values.password) === false) { setErrPassword(true) ; return false }
    if (existEmail(values.email) === true) { setErrEmail(true) ; return false }
    if (values.cgu === false) {setErrCgu(true) ; return false }

    dispatch(registerUser({
      pseudo: values.pseudo,
      email: values.email,
      password: values.password,
      function: values.function,
      cgu: values.cgu,
    }))
  };
console.log('TEST :', values.cgu)
  // Check Valid email
  const checkEmail = (email) => {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
  }

  // Exist  email
  const existEmail = (email) => {
    const emails = ['loryleticee@gmail.com', 'lory@lory.com', 'lo@lo.fr']
    return emails.includes(email)
  }

  // Check Valid password
  const checkPassword = (password) => {
    // speial chars , upper letter , lower letter, number more than 7 chars
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#'<>"#?¨áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ()),$%^+=\-_°\\:/&.;|*])(?=.{8,})/.test(password))
  }

  const handleChange = prop => event => {
    if (prop === 'pseudo') {
      if (event.target.value === false || event.target.value === '') {
        setErrPseudo(true)
      }else{
        setErrPseudo(false)
      }
    }
    if (prop === 'email') {
      if (checkEmail(event.target.value) === false || existEmail(event.target.value) === true) {
        setErrEmail(event.target.value)
      }
    }
    if (prop === 'password') {
      if (checkPassword(event.target.value) === false) {
        setErrPassword(event.target.value)
      }
    }
    if (prop === 'cgu') {
      if (event.target.value === false) {
        setErrCgu(true)
      } else{
        setErrCgu(false)
      }
    }
    
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleClickCgu = () => {
    setValues({ ...values, cgu: !values.cgu })
  }
  const handleMouseDownCgu = event => {
    event.preventDefault()
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  if (user.details !== undefined) {
    if (user.connected === false) {
      history.push('/', { content: 'connexion' })
    } else {
      return <Redirect to='/account' />
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Pseudo"
              type="text"
              id="pseudo"
              autoComplete="current-password"
              onChange={handleChange('pseudo')}
              error={errPseudo}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange('email')}
              error={errEmail === ""}
              helperText={values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') :''}
            />
             <FormHelperText id='my-helper-text'>On ne partagera jamais votre email.</FormHelperText>
            
            <InputLabel className='inputLabel'>
                        Vous êtes* :
                      </InputLabel>
                      <TextField
                        className='textField'
                        id='filled-select-currency'
                        select
                        value={values.currency}
                        onChange={handleChange}
                        helperText='Selectionnez votre fonction'
                        variant='outlined'
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errPassword === ""}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='start'>
                  <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary"
                  checked ={values.cgu}
                  onClick={handleClickCgu}
                  onMouseDown={handleMouseDownCgu}
                  error={errCgu.toString()}
                />
              }
              label="J'accepte les conditions générales de d'utilisation"
            />
            <br></br> <br></br> <br></br>
            <GradientBtn
              variant="contained"
              type="submit"
              className="GradientBtn"
              onClick={catchSubmit}
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
