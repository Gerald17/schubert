import { FETCH_COMPANIES } from '../actions/types';

const initialState = {
  companies: []
}

export default function(state = initialState, { type, payload }){
  switch(type){
      case FETCH_COMPANIES:
      return {
          ...state,
          companies: payload.companies,
      }
      default:
      return state
  }
}
