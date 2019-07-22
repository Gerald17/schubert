import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { replaceVehicle } from "../../actions/vehiclesActions";

import { Card, Avatar, List, Typography, Button, Drawer, Form, Select, Icon } from "antd";

import HttpRequest from "../../api/HttpRequest";

const request = new HttpRequest();
const FormItem = Form.Item;
const Option = Select.Option;
const { Meta } = Card;

const WorkDayCar = ({ 
  teamsData, 
  selectedTeam, 
  journeyCreateDate,
  replaceVehicle,
  form: { getFieldDecorator, getFieldsError, validateFields }
}) => {

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [teamVehicle, setTeamVehicle] = useState({});

  useEffect(() => {
    if(teamsData.length > 0 && selectedTeam){
      const vehicleFromTeam = teamsData.find(team => team.id === selectedTeam);
      setTeamVehicle(vehicleFromTeam.vehicle);
      replaceVehicle(vehicleFromTeam.vehicle)
    }
  }, [selectedTeam])
  
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleDrawerStatus = vehicleToSubstituteId => {
    if (!drawerStatus) {
      request
        .fetchData(
          `/api/Vehicle/${vehicleToSubstituteId}/substitute-avaiable/${journeyCreateDate}`,
          null
        )
        .then(allAvailableVehicles => {
          return allAvailableVehicles.data;
        })
        .then(substituteVehicles => {
          setAvailableVehicles(substituteVehicles);
          setDrawerStatus(!drawerStatus);
        });
    }
    setDrawerStatus(!drawerStatus);
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, value) => {
      if (!err) {
        const getVehicle = availableVehicles.find(newVehicle => newVehicle.id === value.substitute);
        setTeamVehicle(getVehicle);
        replaceVehicle(getVehicle);
        setDrawerStatus(!drawerStatus);
      };
    });
  };

  return (
    <>
      {(teamVehicle && teamVehicle.hasOwnProperty("id")) && (
        <>
          <Card
            type="inner"
            title="Vehículo"
            cover={
              <img
                alt="example"
                src="https://static.vecteezy.com/system/resources/previews/000/420/310/large_2x/vector-truck-icon.jpg"
              />
            }
            actions={[
              <Button onClick={() => handleDrawerStatus(teamVehicle.id)}>Cambiar <Icon type="retweet"/></Button>
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://images.unsplash.com/photo-1490670096971-8005fec55d50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
              }
              title={teamVehicle.model}
              description={teamVehicle.id}
            />
            <br />
            <Card type="inner" title="Info">
              <List itemLayout="vertical">
                <List.Item>
                  <Typography.Text>Año {teamVehicle.year} </Typography.Text>
                  <br />
                  <Typography.Text>
                    Km {teamVehicle.kilometers}
                  </Typography.Text>
                  <br />
                  <Typography.Text>Mi {teamVehicle.mileage} </Typography.Text>
                  <br />
                  <Typography.Text>
                    Estado {teamVehicle.state}
                  </Typography.Text>
                </List.Item>
              </List>
            </Card>
          </Card>
          <Drawer
            title="Seleccione una persona para realizar el cambio"
            placement="bottom"
            closable={true}
            onClose={handleDrawerStatus}
            visible={drawerStatus}
            destroyOnClose={true}
            height={250}
          >
            {availableVehicles.length > 0 ? (
              <Form onSubmit={handleSubmit} layout="vertical">
                <FormItem label="Sustituto" hasFeedback>
                  {getFieldDecorator("substitute", {
                    rules: [
                      { required: true, message: "Seleccione el nuevo vehículo" }
                    ]
                  })(
                    <Select style={{ width: "100%" }}>
                      {availableVehicles.map(option => {
                        return (
                          <Option key={option.id} value={option.id}>
                            {`${option.model} - ${option.id}`}
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
                    Confirmar Cambio
                    <Icon type="retweet"/>
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <p>No se encontraron vehículos disponibles</p>
            )}
          </Drawer>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const selectedTeam = state.teamsInfo.selectedTeam;
  const teamsData = state.teamsInfo.teamsData;
  const journeyCreateDate = state.journeyInfo.journeyCreateDate;
  return {
    selectedTeam,
    teamsData: teamsData,
    journeyCreateDate
  };
};

const EnhancedSubstitutionForm = Form.create({ name: "vehicle_substitution" })(
  WorkDayCar
);

export default connect(
  mapStateToProps,
  { replaceVehicle }
)(EnhancedSubstitutionForm);
