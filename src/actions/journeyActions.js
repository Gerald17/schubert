import { SET_JOURNEY_CREATE_DATE, SET_JOURNEY_END_DATE, OPENED_JOURNEYS } from './types';

// import HttpRequest from "../api/HttpRequest";
// import { endpoints } from "../api/endpoints";

// const request = new HttpRequest();

export const setJourneyCreateDate = journeyCreateDate => {
  return {
    type: SET_JOURNEY_CREATE_DATE,
    payload: {
      journeyCreateDate
    }
  }
}

export const setJourneyEndDate = journeyEndDate => {
  return {
    type: SET_JOURNEY_END_DATE,
    payload: {
      journeyEndDate
    }
  }
}

export const setOpenedJourneys = journeys => {
  return {
    type: OPENED_JOURNEYS,
    payload: {
      journeys
    }
  }
}