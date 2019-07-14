import {
  FETCH_WORKERS,
  FETCH_WORKER,
  FETCH_WORKERS_BY_TEAM,
  UPDATE_REPLACED_WORKERS,
  SET_SUBSTITUTE_INFO
} from "../actions/types";

const initialState = {
  selectedWorker: null,
  workers: [],
  workersByTeam: [],
  worker: {},
  substitutesInfo: []
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_WORKERS:
      return {
        ...state,
        workers: payload.workers
      };
    case FETCH_WORKER:
      return {
        ...state,
        worker: payload.worker
      };
    case FETCH_WORKERS_BY_TEAM:
      return {
        ...state,
        workersByTeam: payload.workersByTeam
      };
    case UPDATE_REPLACED_WORKERS:
      return {
        ...state,
        workersByTeam: payload.updatedWorkers
      };
    case SET_SUBSTITUTE_INFO:
      return {
        ...state,
        substitutesInfo: [...state.substitutesInfo, payload.substituteInfo]
      }
    default:
      return state;
  }
}
