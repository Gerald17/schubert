import { FETCH_WORK_AREA } from './types';

import HttpRequest from '../api/HttpRequest';
import { endpoints } from '../api/endpoints';

const request = new HttpRequest();

export const fetchWorkArea = () => async dispatch => {
	const workAreas = await request
		.fetchData(endpoints.workArea)
		.then(response => response.data);
	dispatch({
		type: FETCH_WORK_AREA,
		payload: {
			workAreas,
		},
	});
};

export const fetchSingleWorkArea = workAreaId => async dispatch => {
	const workAreas = await request
		.fetchData(`${endpoints.workArea}/${workAreaId}`)
		.then(response => response.data);
	dispatch({
		type: FETCH_WORK_AREA,
		payload: {
			workAreas,
		},
	});
};
