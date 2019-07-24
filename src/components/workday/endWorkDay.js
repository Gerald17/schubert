import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  message,
  Divider,
  Card,
  Avatar,
  List,
  Typography,
  Icon,
  Row,
  Col
} from "antd";

import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";

const request = new HttpRequest();

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const { Meta } = Card;
const { Title } = Typography;

const EndTeamJourney = ({
  journeyEndDate,
  match: { params },
  form: { getFieldDecorator, getFieldsError, validateFields }
}) => {
  const [journeyData, setJourneData] = useState({});

  const columnsWorkers = [
    {
      title: "Código",
      dataIndex: "workerId",
      key: "workerId",
      render: worker => worker || ""
    },
    {
      title: "Nombre",
      dataIndex: "worker",
      key: "worker",
      render: worker => worker.name || ""
    },
    {
      title: "Cargo",
      dataIndex: "worker",
      key: "workerTeam",
      render: worker => worker.workerTeam.workArea.name || ""
    },
    {
      title: "Equipo",
      dataIndex: "worker",
      key: "workerTeamName",
      render: worker => worker.workerTeam.name || ""
    },
    {
      title: "Empresa",
      dataIndex: "worker",
      key: "companyId",
      render: worker => worker.companyId || ""
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
          endDate: journeyEndDate,
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
      {journeyData.length > 0 && !journeyData.isClosed ? (
        <>
          <Title>Jornada Cerrada</Title>
          <FormItem label="Id">
            {getFieldDecorator("idClosed", {
              initialValue: params.id
            })(<Input disabled />)}
          </FormItem>
          <Row>
            <Col span={24}>
              <Card title="Estado del vehículo al cerrar" style={{ width: "100%", marginBottom: "16px" }}>
                <Typography.Text>                  
                  {journeyData[0].returnedVehicleStatus}
                </Typography.Text>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title="Commentarios de Cierre" style={{ width: "100%" }}>
                <Typography.Text>
                  {journeyData[0].detailsEndLog}
                </Typography.Text>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Title>Cerrar Jornada</Title>
          <Form onSubmit={handleSubmit} layout="vertical">
            <FormItem label="Id">
              {getFieldDecorator("id", {
                initialValue: params.id
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="Estado del vehículo a entregar" hasFeedback>
              {getFieldDecorator("returnedVehicleStatus", {
                rules: [
                  {
                    required: true,
                    message: "Seleccione el estado del vehículo"
                  }
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
                style={{ float: "right" }}
              >
                Cerrar Jornada
                <Icon type="carry-out" />
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      {journeyData.length > 0 && (
        <>
          <Row>
            <Col span={24}>
              <Divider />
              <h2>Detalle de la Jornada</h2>
              <h1>{journeyData[0].teamJourneyId}</h1>
              <Table
                columns={columnsWorkers}
                dataSource={journeyData[0].workers}
                rowKey="id"
                title={() => "Trabajadores"}
                bordered
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Card
                type="inner"
                title="Vehículo"
                style={{ marginBottom: "16px", width: "100%" }}
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
                  title={journeyData[0].vehicle.model}
                  description={journeyData[0].vehicleId}
                />
                <Card type="inner" title="Info">
                  <List itemLayout="vertical">
                    <List.Item>
                      <Typography.Text>
                        Estado recibido {journeyData[0].receivedVehicleStatus}
                      </Typography.Text>
                      <br />
                      <Typography.Text>
                        Año {journeyData[0].vehicle.year}{" "}
                      </Typography.Text>
                      <br />
                      <Typography.Text>
                        Km {journeyData[0].vehicle.kilometers}
                      </Typography.Text>
                      <br />
                      <Typography.Text>
                        Mi {journeyData[0].vehicle.mileage}{" "}
                      </Typography.Text>
                      <br />
                    </List.Item>
                  </List>
                </Card>
              </Card>
            </Col>
            <Col span={20}>
              <Card title="Herramientas">
                <List itemLayout="vertical">
                  <List.Item>
                    <Typography.Text>Tool 1</Typography.Text>
                  </List.Item>
                  <List.Item>
                    <Typography.Text>Tool 2</Typography.Text>
                  </List.Item>
                  <List.Item>
                    <Typography.Text>Tool 3</Typography.Text>
                  </List.Item>
                  <List.Item>
                    <Typography.Text>Tool 4</Typography.Text>
                  </List.Item>
                </List>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title="Commentarios" style={{ width: "100%" }}>
                <Typography.Text>
                  {journeyData[0].detailsInitialLog}
                </Typography.Text>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const journeyEndDate = state.journeyInfo.journeyEndDate;
  return {
    journeyEndDate
  };
};

const EnhancedEditForm = Form.create({ name: "close_journey" })(EndTeamJourney);

export default connect(
  mapStateToProps,
  null
)(EnhancedEditForm);
