import fetchCatPathologiesData from '../../services/CatPathologies'
import { SET_CAT_PATHOLOGIES } from '.'

export const fetchCatPathologies = () => {
  return async (dispatch) => {
    const data = await fetchCatPathologiesData()
    dispatch({ type: SET_CAT_PATHOLOGIES, data: data.datas })
  }
}
