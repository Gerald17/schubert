import { combineReducers } from 'redux';
import teamsInfo from './teamsReducer';
import workersInfo from './workersReducer';

const mainReducer = combineReducers({
  teamsInfo,
  workersInfo
});

export default mainReducer;


