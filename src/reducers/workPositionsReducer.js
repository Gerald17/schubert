import { FETCH_WORK_POSITIONS } from '../actions/types';

const initialState = {
  selectedWorkPosition: null,
  workPositions: []
}

export default function(state = initialState, { type, payload }){
  switch(type){
      case FETCH_WORK_POSITIONS:
      return {
        ...state,
        workPositions: payload.workPositions,
      }
      default:
      return state
  }
}
