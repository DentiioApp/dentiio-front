import { SET_SPECIALITIES } from "../actions";

const INIT_STATE = {
  specialities: [],
};

export const Specialities = (state = INIT_STATE, action) => {
  switch (action.type) {

    case SET_SPECIALITIES:
      return { ...state, specialities: action.data };
    default:
      return state;
  }
};
