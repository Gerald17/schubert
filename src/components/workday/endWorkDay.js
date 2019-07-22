import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Select, Table, message, Divider, Card, Avatar, List, Typography, Icon } from "antd";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

const request = new HttpRequest();

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const { Meta } = Card;

const EditTeamJourney = ({
  match: { params },
  form: { getFieldDecorator, getFieldsError, validateFields }
}) => {

  const [journeyData, setJourneData] = useState({});

  const columnsWorkers = [
    {
      title: "Código",
      dataIndex: "workerId",
      key: "workerId",
      render: worker => worker
    },
    {
      title: "Nombre",
      dataIndex: "worker",
      key: "worker",
      render: worker => worker.name
    },
    {
      title: "Cargo",
      dataIndex: "worker",
      key: "workerTeam",
      render: worker => worker.workerTeam.workArea.name
    },
    {
      title: "Equipo",
      dataIndex: "worker",
      key: "workerTeamName",
      render: worker => worker.workerTeam.name
    },
    {
      title: "Empresa",
      dataIndex: "worker",
      key: "companyId",
      render: worker => worker.companyId
    }
  ];

  useEffect(() => {
    request
      .fetchData(`${endpoints.teamJourney}/${params.id}`, {})
      .then(response => {
        setJourneData(response.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const valuesToSend = {
          endDate: "2019-07-21",
          detailsEndLog: values.detailsEndLog,
          returnedVehicleStatus: values.returnedVehicleStatus,
          workTools: []
        };
        request
          .updateData(`${endpoints.teamJourney}/${params.id}`, valuesToSend)
          .then(response => {
            if (response.status === 200 || response.status === 201) {
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
    <>
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
            style={{float: "right"}}
          >
            Cerrar Jornada
            <Icon type="carry-out" />
          </Button>
        </Form.Item>

        <Divider />
      </Form>

      <h2>Detalle de la Jornada</h2>
      {journeyData.length > 0 && 
        <>
          <h1>{journeyData[0].teamJourneyId}</h1>
          <Table columns={columnsWorkers} dataSource={journeyData[0].workers} rowKey="id" title={() => "Trabajadores"} bordered />

          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://static.vecteezy.com/system/resources/previews/000/420/310/large_2x/vector-truck-icon.jpg"
              />
            }
          >
            <Meta
              avatar={
                <Avatar src="https://images.unsplash.com/photo-1490670096971-8005fec55d50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
              }
              title={journeyData[0].vehicleId}
              description={journeyData[0].vehicle}
            />
            <Card type="inner" title="Info">
              <List itemLayout="vertical">
                <List.Item>
                  <Typography.Text>Estado recibido {journeyData[0].receivedVehicleStatus} </Typography.Text>
                </List.Item>
              </List>
            </Card>
          </Card>
          <Card
            title="Commentarios"
            style={{ width: "100%" }}
          >            
            <Typography.Text>{journeyData[0].detailsInitialLog} </Typography.Text>
          </Card>          
        </>
      }
    </>
  );
};

const EnhancedEditForm = Form.create({ name: "close_journey" })(
  EditTeamJourney
);

export default connect(
  null,
  null
)(EnhancedEditForm);
