import {addFavCase} from '../../services/Cases'

export const addFav = (item) => {
  const response  = addFavCase(item)

  return response
}