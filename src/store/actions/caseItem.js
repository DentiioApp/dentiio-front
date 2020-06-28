import { CASE_ITEM } from '.'

export const caseItem = (oCase) => {
  const action = {
    type: CASE_ITEM,
    iCase: oCase.id
  }

  return action
}
