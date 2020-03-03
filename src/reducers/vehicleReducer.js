import {
	UPDATE_REPLACED_VEHICLE,
	SET_TEAM_VEHICLE,
	FETCH_VEHICLE,
} from '../actions/types';

const initialState = {
	teamVehicle: {},
	vehicles: [],
};

export default function(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_VEHICLE:
			return {
				...state,
				vehicles: payload.vehicles,
			};
		case UPDATE_REPLACED_VEHICLE:
			return {
				...state,
				teamVehicle: payload.newVehicle,
			};
		case SET_TEAM_VEHICLE:
			return {
				...state,
				teamVehicle: payload.teamVehicle,
			};
		default:
			return initialState;
	}
}
