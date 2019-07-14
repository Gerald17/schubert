import { SET_SELECTED_TEAM, FETCH_TEAMS, SAVE_TEAMS_TO_STORE } from "../actions/types";

const initialState = {
  selectedTeam: null,
  teams: [],
  teamDefaultCar: null,
  teamsData: []
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
    case SAVE_TEAMS_TO_STORE:
      return {
        ...state,
        teamsData: payload.teams
      }
    default:
      return state;
  }
}
