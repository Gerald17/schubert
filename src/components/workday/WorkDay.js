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
      receivedVehicleStatus: "Limpio",
      returnedVehicleStatus: "Limpio",
      startDate: new Date("2019/06/06"),
      endDate: new Date("2019/06/06"),
      detailsInitialLog: "",
      detailsEndLog: "",
      vehicleId: "P131892",
      workTools: [],
      comment: "prueba journey"
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
  return {
    selectedTeam,
    workersTeam
  }
}

export default connect(mapStateToProps, null)(WorkDay);
