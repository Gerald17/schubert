import { SET_SELECTED_TEAM, SAVE_TEAMS_TO_STORE, FETCH_TEAMS } from './types';

import HttpRequest from "../api/HttpRequest";
import { endpoints } from "../api/endpoints";

const request = new HttpRequest();

export const setSelectedTeam = team => {
  return {
      type: SET_SELECTED_TEAM,
      payload: { 
        team
      }
  }
}

export const saveTeamsToStore = teams => {
  return {
    type: SAVE_TEAMS_TO_STORE,
    payload: {
      teams
    }
  }
}

export const fetchTeams = () => async dispatch => {
  const teams = await request
    .fetchData(endpoints.team)
    .then(response => response.data);
  dispatch({
    type: FETCH_TEAMS,
    payload: {
      teams
    }
  });
}