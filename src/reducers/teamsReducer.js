import { SET_SELECTED_TEAM } from '../actions/types';

const initialState = {
  selectedTeam: null,
  teams: []
}

export default function(state = initialState, { type, payload }){
  switch(type){
      case SET_SELECTED_TEAM:
      return {
          ...state,
          selectedTeam: payload.team,
      }
      default:
      return state
  }
}
