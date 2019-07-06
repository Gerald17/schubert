import { SET_SELECTED_TEAM } from './types';

export const setSelectedTeam = team => {
  return{
      type: SET_SELECTED_TEAM,
      payload: { 
        team
      }
  }
}
