import { addFavCase } from "../../services/Cases";
import {
  CASE_ITEM,
  OPEN_SIDE_BAR,
  CLOSE_SIDE_BAR,
} from ".";

export const addFav = (iUser, iItem) => { return addFavCase(iUser, iItem) }

import { CASE_ITEM } from '.'

export const caseItem = (oCase) => { return { type: CASE_ITEM, iCase: oCase.id } }
export const openSideBar = () => {
  return { type: OPEN_SIDE_BAR };
};
export const closeSideBar = () => {
  return { type: CLOSE_SIDE_BAR };
};


