import React from "react";
import { connect } from "react-redux";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

//Ant
import { Row, Button, message } from "antd";

//Custom
import WorkDaySelectors from './workDaySelectors';
import WorkDayPersons from "./workDayPersons";

const request = new HttpRequest();

const WorkDay = ({
  selectedTeam, 
  workersTeam,
  journeyCreateDate
}) => {

  const submitTeamJourney = () => {

    const workers = workersTeam.map(worker => {
      return {
        workerId: worker.id,
        startDate: journeyCreateDate,
        endDate: null,
        comment: "",
        status: ""
      }
    });
    const journey = {
      workers,
      workerTeamId: selectedTeam,
      receivedVehicleStatus: "Limpio",
      returnedVehicleStatus: "",
      startDate: journeyCreateDate,
      endDate: null,
      detailsInitialLog: "",
      detailsEndLog: "",
      vehicleId: "P131892",
      workTools: [],
      comment: ""
    }
    request.createData(endpoints.teamJourney, journey)
    .then(response => {
      if(response.status === 200 || response.status === 201){
        message.success("Registro creado exitosamente")
      }
    })
    .catch(error => {
      console.log("error", error);
    });
  }

  return (
    <>
      <h1>Crear Jornada</h1>
      <Row>
        <WorkDaySelectors/>
        <WorkDayPersons/>
        <Button
          type="primary"
          htmlType="submit"
          onClick={submitTeamJourney}
        >
          Crear Jornada
        </Button>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  const workersTeam = state.workersInfo.workersByTeam;
  const selectedTeam = state.teamsInfo.selectedTeam;
  const journeyCreateDate = state.journeyInfo.journeyCreateDate;
  return {
    selectedTeam,
    workersTeam,
    journeyCreateDate
  }
}

export default connect(mapStateToProps, null)(WorkDay);
