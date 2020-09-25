import fetchTreatmentsData from '../../services/Treatments'
import { SET_TREATMENTS } from '.'

export const fetchTreatments = () => {
  return async (dispatch) => {
    const data = await fetchTreatmentsData()
    dispatch({ type: SET_TREATMENTS, data: data.datas })
  }
}
