import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Select, message } from "antd";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

const request = new HttpRequest();

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const EditTeamJourney = ({
  match: { params },
  form: { getFieldDecorator, getFieldsError, validateFields }
}) => {
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const valuesToSend = {
          startDate: "2019-07-21",
          endDate: "2019-07-21",
          detailsEndLog: values.detailsEndLog,
          workerTeamId: 1,
          returnedVehicleStatus: values.returnedVehicleStatus,
          workTools: [],
          workers: [
            {
              workerId: "00004284-0",
              startDate: "2019-07-21",
              endDate: "2019-07-21",
              comment: "",
              status: "TRABAJADO"
            }
          ]
        }
        request
          .updateData(`${endpoints.teamJourney}/${params.id}`, valuesToSend)
          .then(response => {
            if (response.status === 200 || response.status === 204) {
              message.success("Datos actualizados exitosamente");
            }
          })
          .catch(error => {
            console.log("error", error);
          });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} layout="vertical">
      <FormItem label="Id">
        {getFieldDecorator("id", {
          initialValue: params.id
        })(<Input disabled />)}
      </FormItem>
      <FormItem label="Estado del vehículo a entregar" hasFeedback>
        {getFieldDecorator("returnedVehicleStatus", {
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
        {getFieldDecorator("detailsEndLog", {
          rules: [{ required: false }]
        })(<TextArea style={{ width: "100%" }} rows={4} />)}
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

const EnhancedEditForm = Form.create({ name: "close_journey" })(
  EditTeamJourney
);

export default connect(
  null,
  null
)(EnhancedEditForm);
