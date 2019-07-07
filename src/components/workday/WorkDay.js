import React from "react";
import { connect } from "react-redux";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

//Ant
import { Row, Button } from "antd";

//Custom
import WorkDayForm from './workDaySelectors';
import WorkDayPersons from "./workDayPersons";

const request = new HttpRequest();

const WorkDay = ({
  selectedTeam, 
  workersTeam
}) => {

  const submitTeamJourney = () => {

    const workers = workersTeam.map(worker => {
      return {
        workerId: worker.id,
        startDate: new Date("2019/06/06"),
        endDate: new Date("2019/06/06"),
        comment: "",
        status: "TRABAJADO"
      }
    });
    const journey = {
      workers,
      workerTeamId: selectedTeam,
      vehicleId: "",
      receivedVehicleStatus: "Limpio",
      returnedVehicleStatus: "Limpio",
      startDate: new Date("2019/06/06"),
      endDate: new Date("2019/06/06"),
      detailsInitialLog: "",
      detailsEndLog: "",
      vehicleId: "",
      workTools: [],
      comment: "prueba journey"
    }
    request.createData(endpoints.teamJourney, journey)
    .then(response => {
      console.log("response", response);
    })
    .catch(error => {
      console.log("error", error);
    });
  }

  return (
    <>
      <h1>Crear Jornada</h1>
      <Row>
        <WorkDayForm/>
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
  const workersTeam = state.workersInfo.workers;
  const selectedTeam = state.teamsInfo.selectedTeam;
  return {
    selectedTeam,
    workersTeam
  }
}

export default connect(mapStateToProps, null)(WorkDay);
