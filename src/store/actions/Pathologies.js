import fetchPathologiesData from '../../services/Pathologies'
import { SET_PATHOLOGIES } from '.'

export const fetchPathologies = () => {
  return async (dispatch) => {
    const data = await fetchPathologiesData()
    dispatch({ type: SET_PATHOLOGIES, data: data.datas })
  }
}
