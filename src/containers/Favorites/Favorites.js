import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/App/Header/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { INIT_FAV_CASE, CASES_LIST } from '../../store/actions'
import CasesItem from '../../components/App/Cases/CaseItem/CaseItem'
import { fetchCases, fetchUserFav } from '../../services/Cases'
import { getUserId } from '../../services/Users'
import Spinner from '../../components/UI/Dawers/Spinner'
import { errorApi } from '../../utils'
import { setup } from '../../services/Auth'
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(3)
    }
  }
}))

const Favorites = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const casesList = useSelector((state) => state.cases.casesList)
  const favorites = useSelector((state) => state.cases.favorites)
  const userId = getUserId()

  var favsIds = []; Object.keys(favorites).length > 0 && favorites.map((item) => {
    // Si l'objet est un cas clinique on recupere l'id du cas clinique dans la chaine de caractère de la clé clinicalCaseId
    const slashIndex = item.clinicalCaseId !== undefined ? item.clinicalCaseId.lastIndexOf('/') : false
    const caseId = slashIndex ? Number(item.clinicalCaseId.substr(slashIndex).substr(1, slashIndex.length)) : 0
    // Sinon si l'objet est un favorite on recupère l'id dans la clé id de l'obbjet favorite
    return favsIds.push(caseId === 0 ? item.id : caseId)
  })

  var favoriteCases = []
  casesList.length > 0 && casesList.map((item) => {
    return favsIds.includes(item.id) ? favoriteCases.push(item) : false
  })

  const initUserFav = async () => {
    const response = await fetchUserFav(userId)
    return errorApi().test(response) ? null : dispatch({ type: INIT_FAV_CASE, datas: response.datas })
  }

  const getCases = async () => {
    const fetch = await fetchCases()
    if (fetch.message !== undefined && !errorApi().test(fetch.message)) {
      dispatch({ type: CASES_LIST, datas: fetch.datas, nbrItems: fetch.items })
    }
  }

  useEffect(() => {
    if (Object.keys(favorites).length < 1) {
      initUserFav()
    }
    if (casesList && casesList.length < 1) { getCases() }
  })

  if (setup()) {
    if (casesList.length < 1) {
      return (<><Box bgcolor="background.paper" style={{height: "50em"}}><Header target='favorites' /><Spinner /></Box></>)
    } else {
      return (
        <>
          <Box bgcolor="background.paper">
            <Header target='favorites' />
            <Container maxWidth='lg'>
              <center><span>Publications favorites</span></center>
              <div className={classes.root}>
                {
                  favoriteCases.length > 0 ? favoriteCases.map((oCase, index) => {
                    return <CasesItem key={index} item={oCase} favorite />
                  }) : 'Vous n\'avez pas de publication favorite'
                }
              </div>
            </Container>
          </Box>
        </>
      )
    }
  }
}

export default Favorites
