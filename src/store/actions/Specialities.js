import fetchSpecialitiesData from '../../services/Specialities'
import { SET_SPECIALITIES } from '.'

export const fetchSpecialities = () => {
  return async (dispatch) => {
    const data = await fetchSpecialitiesData()
    dispatch({ type: SET_SPECIALITIES, data: data.datas })
  }
}
