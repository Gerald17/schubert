import { combineReducers } from 'redux';
import teamsInfo from './teamsReducer';
import workersInfo from './workersReducer';
import workPositionsInfo from './workPositionsReducer';
import companiesInfo from './companiesReducer';

const mainReducer = combineReducers({
  teamsInfo,
  workersInfo,
  workPositionsInfo,
  companiesInfo
});

export default mainReducer;


