import { SET_JOURNEY_CREATE_DATE, OPENED_JOURNEYS } from "../actions/types";

const initialState = {
  journeyCreateDate: null,
  openedJourneys: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_JOURNEY_CREATE_DATE:
      return {
        ...state,
        journeyCreateDate: payload.journeyCreateDate
      };
    case OPENED_JOURNEYS:
      return {
        ...state,
        openedJourneys: payload.journeys
      };
    default:
      return state;
  }
}
