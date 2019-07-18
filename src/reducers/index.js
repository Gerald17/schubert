import { combineReducers } from 'redux';
import teamsInfo from './teamsReducer';
import workersInfo from './workersReducer';
import workPositionsInfo from './workPositionsReducer';
import companiesInfo from './companiesReducer';
import journeyInfo from './journeyReducer';
import vehicleInfo from './vehicleReducer';

const mainReducer = combineReducers({
  teamsInfo,
  workersInfo,
  workPositionsInfo,
  companiesInfo,
  journeyInfo,
  vehicleInfo
});

export default mainReducer;


