import { SET_JOURNEY_CREATE_DATE, OPENED_JOURNEYS } from './types';

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

export const setOpenedJourneys = journeys => {
  return {
    type: OPENED_JOURNEYS,
    payload: {
      journeys
    }
  }
}