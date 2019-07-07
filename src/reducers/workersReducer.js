import { FETCH_WORKERS, FETCH_WORKER, FETCH_WORKERS_BY_TEAM } from '../actions/types';

const initialState = {
  selectedWorker: null,
  workers: [],
  workersByTeam: [],
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
      case FETCH_WORKERS_BY_TEAM:
      return {
        ...state,
        workersByTeam: payload.workersByTeam
      }
      default:
      return state
  }
}
