import { FETCH_DEPARTMENT } from './types';

import HttpRequest from '../api/HttpRequest';
import { endpoints } from '../api/endpoints';

const request = new HttpRequest();

export const fetchDepartment = () => async dispatch => {
	const department = await request
		.fetchData(endpoints.siteDepartment)
		.then(response => response.data);
	dispatch({
		type: FETCH_DEPARTMENT,
		payload: {
			department,
		},
	});
};

export const fetchSingleDepartment = departmentId => async dispatch => {
	const departments = await request
		.fetchData(`${endpoints.siteDepartment}/${departmentId}`)
		.then(response => response.data);
	dispatch({
		type: FETCH_DEPARTMENT,
		payload: {
			departments,
		},
	});
};
