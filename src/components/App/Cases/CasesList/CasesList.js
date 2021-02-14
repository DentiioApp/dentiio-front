import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'
import {fetchCases, fetchUserFav, getCaseByUserId} from '../../../../services/Cases'
import {CASES_LIST, INIT_FAV_CASE} from '../../../../store/actions'
import CasesItem from '../CaseItem/CaseItem'
import Paginator from '../../../UI/Paginator/Paginator'
import {getUserId} from '../../../../services/Users'
import {errorApi} from '../../../../utils'
import LoadingCasesList from "../../../UI/Loading/LoadingCasesList";
import Palette from "../../../UI/ColorTheme/Palette";

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

const CasesList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const userId = getUserId()

    const caseSelector = useSelector((state) => state.cases)
    const favorites = caseSelector.favorites

    const [cases, setCases] = useState([])


    const ResponseCases = async () => {
        const CaseById = await fetchCases()
        CaseById.datas && setCases(CaseById.datas)
    }

    const initValues = {
        paginator: 1
    }

    const [values, setValues] = useState(initValues)

    useEffect(() => {
        const getCases = async () => {
            const fetch = await fetchCases(values.paginator)
            if (fetch.message !== undefined && !errorApi().test(fetch.message)) {
                dispatch({type: CASES_LIST, datas: fetch.datas, nbrItems: fetch.items})
            }
        }

        if (cases.length === 0) {
            ResponseCases()
        }

        const initUserFav = async () => {
            const response = await fetchUserFav(userId)
            if (!errorApi().test(response)) {
                dispatch({type: INIT_FAV_CASE, datas: response.datas})
            }
        }

        if (cases && cases.length < 1) {
            initUserFav()
            getCases()
        }
        if (favorites && favorites.length < 1) {
            //initUserFav()
        }
    }, [userId, dispatch, cases, values, favorites])



    return (
        <>
            <Container maxWidth={true} style={{paddingTop: "50px", paddingLeft: "0", paddingRight: "0"}}>

                <center><h1 style={{color: Palette.primary}}>Cas cliniques</h1></center>
                <br/>
                {/* <Paginator 
                    pages={pages} 
                    onChange={handleChange} 
                    current={values.paginator}
                /> */}

                {/* <ButtonMUI
                    variant="contained"
                    color="primary"
                > 
                    {cases.length > 0 ? 'Page ' + values.paginator : ''}
                </ButtonMUI > */}

                <div className={classes.root}>
                    {(cases.length < 1) ? (<LoadingCasesList key={Date.now}/>) : ""}
                    {cases && cases.map((oCase, index) => {
                        var isFavorite = false
                        if (favorites.length > 0) {
                            favorites.map((item) => {
                                var slashIndex = item.clinicalCaseOmnipratiqueId !== undefined ? item.clinicalCaseOmnipratiqueId?.lastIndexOf('/') : false
                                var caseId = slashIndex ? Number(item.clinicalCaseOmnipratiqueId.substr(slashIndex).substr(1, slashIndex.length)) : item.User?.id
                                if (caseId === oCase.id) {
                                    isFavorite = true
                                }
                                return isFavorite
                            })
                        }

                        return <CasesItem key={index} item={oCase} favorite={isFavorite}/>
                    })}
                </div>
{/*
                <Paginator pages={pages} onChange={handleChange} current={values.paginator}/>
*/}
            </Container>
            <br/><br/>
        </>
    )
}

export default CasesList
