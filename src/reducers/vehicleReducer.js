import { UPDATE_REPLACED_VEHICLE } from "../actions/types";

const initialState = {
  teamVehicle: {}
}

export default function(state = initialState, { type, payload }){
  switch(type){
    case UPDATE_REPLACED_VEHICLE:
      return {
        ...state,
        teamVehicle: payload.newVehicle
      }
    default:
      return initialState;
  }
} 