import {
  UPDATE_REPLACED_VEHICLE
} from "../actions/types";

export const replaceVehicle = newVehicle => {
  return {
    type: UPDATE_REPLACED_VEHICLE,
    payload: {
      newVehicle
    }
  }
};