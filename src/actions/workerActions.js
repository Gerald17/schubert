import { FETCH_WORKERS, FETCH_WORKER } from "../actions/types";

import HttpRequest from "../api/HttpRequest";
import { endpoints } from "../api/endpoints";

const request = new HttpRequest();

export const fetchWorkersByTeam = (selectedTeam) => async dispatch => {
  const workers = await request
    .fetchData(`${endpoints.worker}?Filters=team==${selectedTeam}`)
    .then(response => response.data);
  dispatch({
    type: FETCH_WORKERS,
    payload: {
      workers
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

export const fetchSingleWorker = (workerId) => async dispatch => {
  const worker = await request
    .fetchData(`${endpoints.worker}/${workerId}`)
    .then(response => response.data);
  dispatch({
    type: FETCH_WORKER,
    payload: {
      worker
    }
  })
}