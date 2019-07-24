import {
  UPDATE_REPLACED_VEHICLE, 
  SET_TEAM_VEHICLE
} from "../actions/types";

export const replaceVehicle = newVehicle => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_REPLACED_VEHICLE,
      payload: {
        newVehicle
      }
    });
  };
};

export const setVehicle = teamVehicle => {
  return {
    type: SET_TEAM_VEHICLE,
    payload: {
      teamVehicle
    }
  }
};