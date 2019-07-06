import { FETCH_WORKERS } from '../actions/types';

const initialState = {
  selectedWorker: null,
  workers: []
}

export default function(state = initialState, { type, payload }){
  switch(type){
      case FETCH_WORKERS:
      return {
          ...state,
          workers: payload.workers,
      }
      default:
      return state
  }
}
