import React from "react";
import { connect } from "react-redux";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

//Ant
import { Row, Button, message, Select, Input, Form } from "antd";

//Custom
import WorkDaySelectors from "./workDaySelectors";
import WorkDayPersons from "./workDayPersons";
import WorkDayCar from "./workDayCar";

const request = new HttpRequest();
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

//TODO: remove from susbtitutes where already exist by default
//TODO: remove workers already exists when add a new worker

const WorkDay = ({
  selectedTeam,
  workersTeam,
  journeyCreateDate,
  substitutesInfo,
  teamVehicle,
  workersReported,
  form: { getFieldDecorator, getFieldsError, validateFields }
}) => {
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  
  
  const setWorkersReported = (workers, value) => {
    return workers.map((worker, index) => {
      if(worker.workerId === value.id){
        workers[index].comment = value.comments;
        workers[index].status = value.status;
      }
    }); 
  }

  const submitTeamJourney = () => {
    validateFields((err, values) => {
      if (!err) {
        const workers = workersTeam.map(worker => {
          return {
            name: worker.name,
            workerId: worker.id,
            startDate: journeyCreateDate,
            endDate: journeyCreateDate,
            comment: "",
            status: "TRABAJADO" //
          };
        });

        workersReported.map(workerReported => {
          return setWorkersReported(workers, workerReported);
        });
        
        const journey = {
          workers,
          startDate: journeyCreateDate,
          endDate: journeyCreateDate,
          detailsInitialLog: values.comments,
          vehicleId: teamVehicle.id,
          receivedVehicleStatus: values.vehicleStatus,
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
      }
    });
  };

  return (
    <>
      <h1>Crear Jornada</h1>
      <Row>
        <WorkDaySelectors />
        <WorkDayPersons />
        <WorkDayCar />
        <FormItem label="Estado del vehículo recibido" hasFeedback>
          {getFieldDecorator("vehicleStatus", {
            rules: [
              { required: true, message: "Seleccione el estado del vehículo" }
            ]
          })(
            <Select style={{ width: "100%" }}>
              <Option value="LIMPIO"> Limpio </Option>
              <Option value="DEFECTO"> Defecto </Option>
              <Option value="SUCIO"> Sucio </Option>
              <Option value="LISTO"> Listo </Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Observaciones" hasFeedback>
          {getFieldDecorator("comments", {
            rules: [{ required: false }]
          })(<TextArea style={{ width: "100%" }} rows={4} />)}
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          onClick={submitTeamJourney}
          disabled={hasErrors(getFieldsError())}
        >
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
  const teamVehicle = state.vehicleInfo.teamVehicle;
  const workersReported = state.workersInfo.workersReported || [];
  return {
    selectedTeam,
    workersTeam,
    journeyCreateDate,
    substitutesInfo,
    teamVehicle,
    workersReported
  };
};

const EnhancedForm = Form.create({ name: "workday" })(WorkDay);

export default connect(
  mapStateToProps,
  null
)(EnhancedForm);
