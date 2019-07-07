import { FETCH_COMPANIES } from './types';

import HttpRequest from "../api/HttpRequest";
import { endpoints } from "../api/endpoints";

const request = new HttpRequest();

export const fetchCompanies = () => async dispatch => {
  const companies = await request
    .fetchData(endpoints.companies)
    .then(response => response.data);
  dispatch({
    type: FETCH_COMPANIES,
    payload: {
      companies
    }
  });
}