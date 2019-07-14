import { SET_JOURNEY_CREATE_DATE } from "../actions/types";

const initialState = {
  journeyCreateDate: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_JOURNEY_CREATE_DATE:
      return {
        ...state,
        journeyCreateDate: payload.journeyCreateDate
      };
    default:
      return state;
  }
}
