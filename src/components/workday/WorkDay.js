import React from "react";
import { connect } from "react-redux";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

//Ant
import { Row, Button, message } from "antd";

//Custom
import WorkDaySelectors from "./workDaySelectors";
import WorkDayPersons from "./workDayPersons";
import WorkDayCar from "./workDayCar";

const request = new HttpRequest();

//TODO: remove from susbtitutes where already exist by default

const WorkDay = ({
  selectedTeam,
  workersTeam,
  journeyCreateDate,
  substitutesInfo
}) => {
  const submitTeamJourney = () => {
    const workers = workersTeam.map(worker => {
      return {
        workerId: worker.id,
        startDate: journeyCreateDate,
        endDate: journeyCreateDate,
        comment: "",
        status: "TRABAJADO" //
      };
    });
    const journey = {
      workers,
      startDate: journeyCreateDate,
      endDate: journeyCreateDate,
      detailsInitialLog: "comentarion initial log",
      vehicleId: "P131892",
      receivedVehicleStatus: "Limpio",
      workerTeamId: selectedTeam,
      returnedVehicleStatus: "",
      workTools: []
    };
    request
      .createData(endpoints.teamJourney, journey)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          message.success("Registro creado exitosamente");
          if (substitutesInfo.length > 0) {
            const substitutesRequest = substitutesInfo.map(substitute => {
              return {
                url: `/api/worker/${substitute.oldWorkerId}/substitute/${
                  substitute.newWorkerId
                }`,
                params: {
                  journey: journeyCreateDate,
                  comments: substitute.comment,
                  teamJourneyId: response.data.id,
                  dateAssigned: journeyCreateDate
                }
              };
            });
            Promise.all(
              substitutesRequest.map(substitute =>
                request.createData(substitute.url, substitute.params)
              )
            )
              .then(values => console.log("values", values))
              .catch(errors => console.log("errors", errors));
          }
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <>
      <h1>Crear Jornada</h1>
      <Row>
        <WorkDaySelectors />
        <WorkDayPersons />
        <WorkDayCar />
        <Button type="primary" htmlType="submit" onClick={submitTeamJourney}>
          Crear Jornada
        </Button>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  const workersTeam = state.workersInfo.workersByTeam;
  const substitutesInfo = state.workersInfo.substitutesInfo;
  const selectedTeam = state.teamsInfo.selectedTeam;
  const journeyCreateDate = state.journeyInfo.journeyCreateDate;
  return {
    selectedTeam,
    workersTeam,
    journeyCreateDate,
    substitutesInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(WorkDay);
