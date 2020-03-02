import { FETCH_DEPARTMENT } from '../actions/types';

const initialState = {
	departments: [],
};

export default function(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_DEPARTMENT:
			return {
				...state,
				departments: payload.department,
			};
		default:
			return state;
	}
}
