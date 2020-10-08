import {
  CASES_LIST,
  OPEN_SIDE_BAR,
  CLOSE_SIDE_BAR
} from '.'

export const caseItem = (oCase) => { return { type: CASES_LIST, iCase: oCase.id } }
export const openSideBar = () => {
  return { type: OPEN_SIDE_BAR }
}
export const closeSideBar = () => {
  return { type: CLOSE_SIDE_BAR }
}
