import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Divider, Drawer, Select, Button, Form, message, Input } from "antd";


import HttpRequest from "../../api/HttpRequest";
import { endpoints } from "../../api/endpoints";
import { fetchWorkersByTeam, replaceWorkers } from "../../actions/workerActions";

const request = new HttpRequest();
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const WorkDayPersons = ({
  selectedTeam,
  workersByTeam,
  journeyCreateDate,
  fetchWorkersByTeam,
  replaceWorkers,
  form: { getFieldDecorator, getFieldsError, validateFields }
}) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Cargo",
      dataIndex: "workPosition",
      key: "workPosition",
      render: workPosition => workPosition.name
    },
    {
      title: "Empresa",
      dataIndex: "companyId",
      key: "companyId"
    },
    {
      title: "Acción",
      key: "action",
      render: ({ id }) => (
        <span>
          <Button onClick={() => handleDrawerStatus(id)}>Cambiar</Button>
          <Divider type="vertical" />
          <Button>Reportar</Button>
        </span>
      )
    }
  ];

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [workerToChange, setWorkerToChange] = useState([]);

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  // load workers when team changes
  useEffect(() => {
    if (selectedTeam) {
      fetchWorkersByTeam(selectedTeam);
    }
  }, [selectedTeam]);

  const handleDrawerStatus = workerToSubstituteId => {
    if (!drawerStatus) {
      request
        .fetchData(
          `/api/Worker/${workerToSubstituteId}/substitute-avaiable/${journeyCreateDate}`,
          null
        )
        .then(allAvailableWorkers => {
          return allAvailableWorkers.data;
        })
        .then(substituteWorkers => {
          setWorkerToChange(workerToSubstituteId);
          setAvailableWorkers(substituteWorkers);
          setDrawerStatus(!drawerStatus);
        });
    }
    setDrawerStatus(!drawerStatus);
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        replaceWorkers(workerToChange, values.substitute, workersByTeam);
        setDrawerStatus(!drawerStatus);
      };
    });
  };

  const workers = workersByTeam.map(workerByTeam => {
    //neccesary to remove warning from antd (every row should have a unique key)
    workerByTeam.key = workerByTeam.id;
    return workerByTeam;
  });
  return (
    <>
      {workers.length > 0 && <Table columns={columns} dataSource={workers} />}
      <Drawer
        title="Seleccione una persona para realizar el cambio"
        placement="bottom"
        closable={true}
        onClose={handleDrawerStatus}
        visible={drawerStatus}
        destroyOnClose={true}
        height={400}
      >
        {availableWorkers.length > 0 ? (
          <Form onSubmit={handleSubmit} layout="vertical">
            <FormItem label="Sustituto" hasFeedback>
              {getFieldDecorator("substitute", {
                rules: [{ required: true, message: "Seleccione el sustituto" }]
              })(
                <Select style={{ width: "100%" }}>
                  {availableWorkers.map(option => {
                    return (
                      <Option key={option.id} value={option.id}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem label="Observaciones" hasFeedback>
              {getFieldDecorator("comments", {
                rules: [{ required: false }]
              })(
                <TextArea style={{ width: "100%" }} rows={4}/>
              )}
            </FormItem>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Confirmar
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <p>No se encontraron empleados disponibles</p>
        )}
      </Drawer>
    </>
  );
};


const mapStateToProps = state => {
  const selectedTeam = state.teamsInfo.selectedTeam;
  const workersByTeam = state.workersInfo.workersByTeam;
  const journeyCreateDate = state.journeyInfo.journeyCreateDate;
  return {
    selectedTeam,
    workersByTeam,
    journeyCreateDate
  };
};

const EnhancedSubstitutionForm = Form.create({ name: "worker_substitution" })(
  WorkDayPersons
);

export default connect(
  mapStateToProps,
  { fetchWorkersByTeam, replaceWorkers }
)(EnhancedSubstitutionForm);
