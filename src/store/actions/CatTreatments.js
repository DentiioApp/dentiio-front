import fetchCatTreatmentsData from '../../services/CatTreatments'
import { SET_CAT_TREATMENTS } from '.'

export const fetchCatTreatments = () => {
  return async (dispatch) => {
    const data = await fetchCatTreatmentsData()
    dispatch({ type: SET_CAT_TREATMENTS, data: data.datas })
  }
}
