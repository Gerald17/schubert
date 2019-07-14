import {
  FETCH_WORKERS,
  FETCH_WORKER,
  FETCH_WORKERS_BY_TEAM,
  UPDATE_REPLACED_WORKERS
} from "../actions/types";

import HttpRequest from "../api/HttpRequest";
import { endpoints } from "../api/endpoints";

const request = new HttpRequest();

export const fetchWorkersByTeam = selectedTeam => async dispatch => {
  const workersByTeam = await request
    .fetchData(`${endpoints.worker}?Filters=team==${selectedTeam}`)
    .then(response => response.data);
  dispatch({
    type: FETCH_WORKERS_BY_TEAM,
    payload: {
      workersByTeam
    }
  });
};

export const replaceWorkers = (
  oldWorker,
  newWorker,
  currentWorkers
) => async dispatch => {
  console.log("begin", currentWorkers);
  const index = currentWorkers.findIndex(worker => worker.id === oldWorker);
  let updatedWorkers = [];
  const getWorkerInfo = await request
    .fetchData(`${endpoints.worker}/${newWorker}`)
    .then(response => {
      currentWorkers.splice(index, 1, response.data);
      updatedWorkers = currentWorkers;
      return updatedWorkers;
    });
    console.log("updaaa", updatedWorkers);
  dispatch({
    type: UPDATE_REPLACED_WORKERS,
    payload: {
      updatedWorkers
    }
  });
};

export const fetchWorkers = () => async dispatch => {
  const workers = await request
    .fetchData(endpoints.worker)
    .then(response => response.data);
  dispatch({
    type: FETCH_WORKERS,
    payload: {
      workers
    }
  });
};

export const fetchSingleWorker = workerId => async dispatch => {
  const worker = await request
    .fetchData(`${endpoints.worker}/${workerId}`)
    .then(response => response.data);
  dispatch({
    type: FETCH_WORKER,
    payload: {
      worker
    }
  });
};
