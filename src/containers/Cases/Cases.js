import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import CasesList from '../../components/App/Cases/CasesList/CasesList'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/App/Header/Header'
import Search from '../../components/UI/Search/CasesSearch/CasesSearch'
import { setup } from '../../services/Auth'
import { getUserById, getUserId } from '../../services/Users'
import { SET_USER } from '../../store/actions'
import Box from "@material-ui/core/Box";
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';



const Cases = () => {
  const dispatch = useDispatch()
  const current_user = useSelector((state) => (state.user.current_user))
  const [fetchUser, setFetchUser] = useState(false)
  const [open, setOpen] = React.useState(
      localStorage.getItem('bienvenueMessage') !== "false"
  )

  const handleMessage = () => {
    setOpen(false)
    localStorage.setItem('bienvenueMessage', "false")
    }

  useEffect(() => {

    const ResponseUser = async () => {
      const response = await getUserById(getUserId())
      if (Object.entries(response).length !== 0) {
        setFetchUser(true)
        dispatch({ type: SET_USER, datas: response.datas })
      }
    }

    if (!fetchUser && Object.entries(current_user).length < 1) {ResponseUser()}
    }, [fetchUser, current_user, dispatch])

  if (setup()) {
    return (
        <>
          <Box bgcolor="background.paper">
            <Header target='home' />
            <Collapse in={open} style={{padding: "30px 20px"}}>
              <Alert
                  icon={false}
                  severity="info"
                  action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleMessage();
                        }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
              >
                <h2>Bienvenue sur Dentiio</h2>
                <p>
                    L'équipe Dentiio est heureuse de vous acceuillir sur cette Beta.<br/>
                    Nous avons pour but de vous fournir un espace d'échange sécurisé 🔒 et adapté à votre pratique 🦷 <br/>
                    Vous faites partis de nos premier utilisateurs, félicitations 🎉 <br/><br/>
                </p>
                  <h4>Ici vous pouvez</h4>
                  <ul>
                      <li>Publier vos cas cliniques afin de les partager à vos confrères</li>
                      <li>Discutez autour des cas</li>
                      <li>Modifier votre avatar (page profil -> cliquez sur l'avatar ou dans les paramètre)</li>
                  </ul>
                  <p>De nouvelles fonctionnalitées arrive prochainement !</p>
                  <br/>
                  <p>PS: N'oubliez pas de nous donnez votre avis, il est précieux.</p>
              </Alert>
            </Collapse>
            {/*<Search />*/}
            <CasesList />
          </Box>
        </>
    )
  } else {
    return (<Redirect to='/' />)
  }
}

export default Cases
