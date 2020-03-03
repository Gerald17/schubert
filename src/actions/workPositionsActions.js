import { FETCH_WORK_POSITIONS } from './types';

import HttpRequest from '../api/HttpRequest';
import { endpoints } from '../api/endpoints';

const request = new HttpRequest();

export const fetchWorkPositions = () => async dispatch => {
	const workPositions = await request
		.fetchData(endpoints.workPosition)
		.then(response => response.data);
	dispatch({
		type: FETCH_WORK_POSITIONS,
		payload: {
			workPositions,
		},
	});
};

export const fetchSingleWorkPosition = workPositionId => async dispatch => {
	const workPositions = await request
		.fetchData(`${endpoints.workPosition}/${workPositionId}`)
		.then(response => response.data);
	dispatch({
		type: FETCH_WORK_POSITIONS,
		payload: {
			workPositions,
		},
	});
};
