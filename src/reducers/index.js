import { combineReducers } from 'redux';
import teamsInfo from './teamsReducer';
import workersInfo from './workersReducer';
import workPositionsInfo from './workPositionsReducer';
import companiesInfo from './companiesReducer';
import journeyInfo from './journeyReducer';
import vehicleInfo from './vehicleReducer';
import departmentInfo from './departmentReducer';
import workAreasInfo from './workAreaReducer';

const mainReducer = combineReducers({
	teamsInfo,
	workersInfo,
	workPositionsInfo,
	companiesInfo,
	journeyInfo,
	vehicleInfo,
	departmentInfo,
	workAreasInfo,
});

export default mainReducer;
