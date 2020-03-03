import {
	UPDATE_REPLACED_VEHICLE,
	SET_TEAM_VEHICLE,
	FETCH_VEHICLE,
} from '../actions/types';

import HttpRequest from '../api/HttpRequest';
import { endpoints } from '../api/endpoints';

const request = new HttpRequest();

export const replaceVehicle = newVehicle => {
	return dispatch => {
		dispatch({
			type: UPDATE_REPLACED_VEHICLE,
			payload: {
				newVehicle,
			},
		});
	};
};

export const setVehicle = teamVehicle => {
	return {
		type: SET_TEAM_VEHICLE,
		payload: {
			teamVehicle,
		},
	};
};

export const fetchVehicle = () => async dispatch => {
	const vehicles = await request
		.fetchData(endpoints.vehicle)
		.then(response => response.data);
	dispatch({
		type: FETCH_VEHICLE,
		payload: {
			vehicles,
		},
	});
};

export const fetchSingleVehicle = vehicleId => async dispatch => {
	const vehicles = await request
		.fetchData(`${endpoints.vehicle}/${vehicleId}`)
		.then(response => response.data);
	dispatch({
		type: FETCH_VEHICLE,
		payload: {
			vehicles,
		},
	});
};
