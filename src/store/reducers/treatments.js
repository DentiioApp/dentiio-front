import { SET_TREATMENTS } from "../actions";

const INIT_STATE = {
  treatments: [],
};

export const Treatments = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_TREATMENTS:
      return { ...state, treatments: action.data };
    default:
      return state;
  }
};
