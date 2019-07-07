import { FETCH_WORKERS, FETCH_WORKER } from '../actions/types';

const initialState = {
  selectedWorker: null,
  workers: [],
  worker: {}
}

export default function(state = initialState, { type, payload }){
  switch(type){
      case FETCH_WORKERS:
      return {
        ...state,
        workers: payload.workers,
      }
      case FETCH_WORKER:
      return {
        ...state,
        worker: payload.worker
      }
      default:
      return state
  }
}
