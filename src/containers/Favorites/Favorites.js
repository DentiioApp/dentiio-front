import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/App/Header/Header'
import { INIT_FAV_CASE, CASES_LIST } from '../../store/actions'
import CasesItem from '../../components/App/CaseItem/CaseItem'
import { fetchCases, fetchUserFav } from '../../services/Cases'
import { getUserId } from '../../services/Users'

const Favorites = () => {
  const favorites = useSelector((state) => state.cases.favorites)
  const userId = getUserId()
  const casesList = useSelector((state) => state.cases.cases)
  const dispatch = useDispatch()

  const initUserFav = async () => {
    const response = await fetchUserFav(userId)
    const regex2 = RegExp(/Error/)
    if (!regex2.test(response)) {
      dispatch({ type: INIT_FAV_CASE, data: response.datas })
    }
  }

  useEffect(() => {
    if (favorites && favorites.length < 1) { initUserFav() }
  }, [favorites.length])

  const getCases = async () => {
    const fetch = await fetchCases()
    const regex2 = RegExp(/Error/)
    if (fetch.message !== undefined && !regex2.test(fetch.message)) {
      dispatch({ type: CASES_LIST, datas: fetch.datas, nbrItems: fetch.items })
    }
  }

  useEffect(() => {
    if (casesList && casesList.length < 1) { getCases() }
  }, [])

  return (
    <>
      <Header target='favorites' />
      {casesList.lenght > 0 && casesList.map((oCase, index) => {
        var isFavorite = false
        if (favorites.length > 0) {
          favorites.map((item) => {
            if (item.id === oCase.id) { isFavorite = true }
            return <CasesItem key={index} item={oCase} favorite={isFavorite} />
          })
        }
        return isFavorite
      })}
    </>
  )
}

export default Favorites
