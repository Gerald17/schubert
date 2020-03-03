import { FETCH_WORK_AREA } from '../actions/types';

const initialState = {
	workAreas: [],
};

export default function(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_WORK_AREA:
			return {
				...state,
				workAreas: payload.workAreas,
			};
		default:
			return state;
	}
}
