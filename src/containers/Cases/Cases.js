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
                    Vous faites partie de nos premiers utilisateurs, félicitations 🎉
                </p>
                  <h4>Nous avons besoin de vous pour tester notre application. Voici votre mission :</h4>
                  <ol>
                      <li>Naviguez sur la plateforme et prenez vos repères</li>
                      <li>Publiez un où plusieurs cas cliniques</li>
                      <li>Découvrez et commentez les cas cliniques déjà publiés</li>
                  </ol>
                  <p>Une fois la mission terminée nous attendons votre rapport: répondez au petit questionnaire et faites nous vos remarques!</p>
                  <br/>
                  <p>L'équipe Dentiio vous remercie d'avance pour votre aide et votre soutien dans cette aventure! 🚀</p>
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
