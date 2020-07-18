import { addFavCase } from '../../services/Cases'
import { CASE_ITEM } from '.'

export const addFav = (iUser, iItem) => { return addFavCase(iUser, iItem) }
export const caseItem = (oCase) => { return{ type: CASE_ITEM, iCase: oCase.id } }
