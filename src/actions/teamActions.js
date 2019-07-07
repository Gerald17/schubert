import { SET_SELECTED_TEAM, FETCH_TEAMS } from './types';

import HttpRequest from "../api/HttpRequest";
import { endpoints } from "../api/endpoints";

const request = new HttpRequest();

export const setSelectedTeam = team => {
  return{
      type: SET_SELECTED_TEAM,
      payload: { 
        team
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