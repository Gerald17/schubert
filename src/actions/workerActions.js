import {
  FETCH_WORKERS,
  FETCH_WORKER,
  FETCH_WORKERS_BY_TEAM,
  UPDATE_REPLACED_WORKERS,
  SET_SUBSTITUTE_INFO,
  SET_WORKER_REPORTED_INFO,
  ADD_WORKER_TO_TEAM,
  RESET_WORKERS
} from "../actions/types";

import HttpRequest from "../api/HttpRequest";
import { endpoints } from "../api/endpoints";

const request = new HttpRequest();

export const fetchWorkersByTeam = (selectedTeam, journeyCreateDate) => async dispatch => {
  const workersByTeam = await request
    .fetchData(`${endpoints.worker}?Filters=team==${selectedTeam}&date=${journeyCreateDate}`)
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
  let updatedWorkers = [];
  updatedWorkers = currentWorkers.filter(worker => worker.id !== oldWorker);
  await request
    .fetchData(`${endpoints.worker}/${newWorker}`)
    .then(response => {
      return response.data;
    })
    .then(data => {
      return updatedWorkers.push(data);
    });

  dispatch({
    type: UPDATE_REPLACED_WORKERS,
    payload: {
      updatedWorkers
    }
  });
};

export const setSubstituteInfo = (oldWorker, newWorkerInfo) => {  
  const substituteInfo = {
    oldWorkerId: oldWorker,
    newWorkerId: newWorkerInfo.substitute,
    comment: newWorkerInfo.comments
  }
  return (dispatch) => {
    dispatch({
      type: SET_SUBSTITUTE_INFO,
      payload: {
        substituteInfo
      }
    });
  };
}

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

export const setReportWorkerInfo = workerReportedInfo => {
  return (dispatch) => {
    dispatch({
      type: SET_WORKER_REPORTED_INFO,
      payload: {
        workerReportedInfo
      }
    });
  };
}

export const addWorkerToTeam = workerToAddId => async dispatch => {
  const worker = await request
  .fetchData(`${endpoints.worker}/${workerToAddId}`)
  .then(response => response.data);
  dispatch({
    type: ADD_WORKER_TO_TEAM,
    payload: {
      worker
    }
  });
}

export const resetWorkers = () => {
  console.log("knasdad")
  return (dispatch) => {
    dispatch({
      type: RESET_WORKERS
    });
  };
}