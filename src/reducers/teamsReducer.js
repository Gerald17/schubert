import { SET_SELECTED_TEAM, FETCH_TEAMS } from "../actions/types";

const initialState = {
  selectedTeam: null,
  teams: [],
  teamDefaultCar: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: payload.team
      };
    case FETCH_TEAMS:
      return {
        ...state,
        teams: payload.teams
      };
    default:
      return state;
  }
}
