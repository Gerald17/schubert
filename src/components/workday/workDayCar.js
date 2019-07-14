import React from 'react';
import { connect } from 'react-redux';

const WorkDayCar = ({teamDefaultCar}) => {
  return (
    <>
    { teamDefaultCar && 
      <h1>Carrito</h1>
    }
    </>
  );
}

const mapStateToProps = state => {
  const teamDefaultCar = state.teamsInfo.teamDefaultCar;
  return {
    teamDefaultCar
  };
};


export default connect(
  mapStateToProps,
  null
)(WorkDayCar);
