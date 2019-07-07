import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Button, message } from "antd";

import { fetchSingleWorker } from "../../actions/workerActions";
import { fetchWorkPositions } from "../../actions/workPositionsActions";
import { fetchCompanies } from "../../actions/companiesActions";
import { fetchTeams } from "../../actions/teamActions";
import { getOptions } from "../../utils/common";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

const request = new HttpRequest();

const FormItem = Form.Item;
const Option = Select.Option;

const EditWorker = ({
  worker,
  workPositions,
  companies,
  teams,
  fetchSingleWorker,
  fetchWorkPositions,
  fetchCompanies,
  fetchTeams,
  match: { params },
  form: {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
    validateFields
  }
}) => {
  useEffect(() => {
    fetchSingleWorker(params.workerId);
    fetchWorkPositions();
    fetchCompanies();
    fetchTeams();
  }, []);

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        console.log("Errores", err);
      }else{
        request.updateData(`${endpoints.worker}/${worker.id}`, values)
        .then(response => {
          switch(response.status){
            case 204:
            case 200:
              message.success("Datos actualizados exitosamente");
            break;
            case 400:
            case 500:
              message.error("Hubo un error y no se completo la solicitud");
            break;
            default:
              message.warning("Sucedió un error desconocido y no se completo la solicitud")
          }
        });
      }
    });
  };

  //const nameError = isFieldTouched("name") && getFieldError("name");
  //const nitError = isFieldTouched("nit") && getFieldError("nit");
  const isssError = isFieldTouched("isss") && getFieldError("isss");
  //const workPositionError = isFieldTouched("workPosition") && getFieldError("workPosition");
  //const companyIdError = isFieldTouched("companyId") && getFieldError("companyId");
  //const workerTeamIdError = isFieldTouched("workerTeamId") && getFieldError("workerTeamId");

  return (
    <Form onSubmit={handleSubmit} layout="vertical">
      <FormItem label="Id">
        {getFieldDecorator("id", {
          initialValue: worker.id
        })(<Input disabled />)}
      </FormItem>
      <FormItem label="Nombre" hasFeedback>
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Escriba el nombre" }],
          initialValue: worker.name
        })(<Input placeholder="Nombre" />)}
      </FormItem>
      <FormItem label="Nit" hasFeedback>
        {getFieldDecorator("nit", {
          rules: [{ required: true, message: "Escriba el número de NIT" }],
          initialValue: worker.nit
        })(<Input placeholder="NIT" />)}
      </FormItem>
      <FormItem
        label="ISSS"
        validateStatus={isssError ? "error" : ""}
        help={isssError || ""}
      >
        {getFieldDecorator("isss", {
          rules: [{ required: true, message: "Escriba el número del ISSS" }],
          initialValue: worker.isss
        })(<Input placeholder="ISSS" />)}
      </FormItem>
      <FormItem label="Cargo" hasFeedback>
        {getFieldDecorator("workPositionId", {
          rules: [{ required: true, message: "Seleccione el cargo!" }],
          initialValue: worker.workPositionId
        })(
          <Select style={{ width: "200px" }}>
            {workPositions.map(option => {
              return (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              );
            })}
          </Select>
        )}
      </FormItem>
      <FormItem label="Empresa" hasFeedback>
        {getFieldDecorator("companyId", {
          rules: [{ required: true, message: "Seleccione una empresa" }],
          initialValue: worker.companyId
        })(
          <Select style={{ width: "200px" }}>
            {companies.map(option => {
              return (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              );
            })}
          </Select>
        )}
      </FormItem>
      <FormItem label="Equipo" hasFeedback>
        {getFieldDecorator("workerTeamId", {
          rules: [{ required: true, message: "Seleccione un equipo" }],
          initialValue: worker.workerTeamId
        })(
          <Select style={{ width: "200px" }}>
            {teams.map(option => {
              return (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              );
            })}
          </Select>
        )}
      </FormItem>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = state => {
  const worker = state.workersInfo.worker;
  const workPositions = getOptions(state.workPositionsInfo.workPositions);
  const companies = getOptions(state.companiesInfo.companies);
  const teams = getOptions(state.teamsInfo.teams);
  return {
    worker,
    workPositions,
    companies,
    teams
  };
};

const EnhancedEditWorkerForm = Form.create({ name: "worker_edit" })(EditWorker);

export default connect(
  mapStateToProps,
  { fetchSingleWorker, fetchWorkPositions, fetchCompanies, fetchTeams }
)(EnhancedEditWorkerForm);
