import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Divider, Drawer, Select, Button, Form, Input, Badge, Icon } from "antd";


import HttpRequest from "../../api/HttpRequest";
import { 
  fetchWorkersByTeam, 
  replaceWorkers, 
  setSubstituteInfo, 
  setReportWorkerInfo, 
  addWorkerToTeam 
} from "../../actions/workerActions";

const request = new HttpRequest();
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const reportStatus = [
  { id: "AUSENTE", name: "AUSENTE" },
  { id: "VACACION", name: "VACACION" },
  { id: "PERMISO", name: "PERMISO" },
  { id: "REPORTE", name: "REPORTE"}
]

const WorkDayPersons = ({
  selectedTeam,
  workersByTeam,
  journeyCreateDate,
  fetchWorkersByTeam,
  replaceWorkers,
  setSubstituteInfo,
  setReportWorkerInfo,
  addWorkerToTeam,
  form: { getFieldDecorator, getFieldsError, validateFields }
}) => {

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [reportDrawerStatus, setReportDrawerStatus] = useState(false);
  const [addDrawerStatus, setAddDrawerStatus] = useState(false);
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [workerToChange, setWorkerToChange] = useState([]);
  const [workerToReport, setWorkerToReport] = useState(null);
  const [workersReported, setWorkersReported] = useState([]);

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
          { workersReported.find(worker => worker.id === id) ? 
            <Badge count={"Reportado"}/> : 
            <>
              <Button onClick={() => handleDrawerStatus(id)}>Cambiar <Icon type="retweet" /></Button>
              <Divider type="vertical" />
              <Button type="danger" onClick={() => handleReportDrawerStatus(id)}>Reportar <Icon type="alert"/></Button>
            </>
          }
        </span>
      )
    }
  ];

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  // load workers when team changes
  useEffect(() => {
    if (selectedTeam) {
      fetchWorkersByTeam(selectedTeam, journeyCreateDate);
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
    validateFields(["substitute"], (err, values) => {
      if (!err) {
        replaceWorkers(workerToChange, values.substitute, workersByTeam);
        setSubstituteInfo(workerToChange, values);
        setDrawerStatus(!drawerStatus);
      };
    });
  };

  const handleReportDrawerStatus = workerToReportId => {
    if (!reportDrawerStatus) {
      setWorkerToReport(workerToReportId);
      setReportDrawerStatus(!reportDrawerStatus);
    }
    setReportDrawerStatus(!reportDrawerStatus);
  };

  const handleReportSubmit = e => {
    e.preventDefault();
    validateFields(["workerReportedStatus"], (err, values) => {
      if (!err) {
        const workerReported = workersByTeam.find(worker => worker.id === workerToReport);
        workerReported.status = values.workerReportedStatus;
        workerReported.comments = values.workerReportedComments;
        setReportWorkerInfo(workerReported);
        setWorkersReported([...workersReported, workerReported]);
      };
    });
    setReportDrawerStatus(!reportDrawerStatus);
  };

  const handleAddDrawerStatus = () => {
    if (!addDrawerStatus) {
      request
        .fetchData(
          `/api/Worker`,
          {journeyCreateDate}
        )
        .then(allAvailableWorkers => {
          return allAvailableWorkers.data;
        })
        .then(substituteWorkers => {
          setAvailableWorkers(substituteWorkers);
          setAddDrawerStatus(!addDrawerStatus);
        });
    }
    setAddDrawerStatus(!addDrawerStatus);
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    validateFields(['employee'], (err, values) => {
      if (!err) {
        addWorkerToTeam(values.employee);
      };
    });
    setAddDrawerStatus(!addDrawerStatus);
  };

  return (
    <>
      {workersByTeam.length > 0 && 
        <div>  
        <Divider type="horizontal" />
        <Button
          type="primary"
          onClick={() => handleAddDrawerStatus()}
          style={{ marginBottom: 16 }}
        >
          Agregar Trabajador 
          <Icon type="usergroup-add" />
        </Button>
          <Table columns={columns} dataSource={workersByTeam} rowKey={'id'} title={() => "Trabajadores"} bordered />
        </div>
      }

      {/* Drawer to change worker */ }
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
                <Icon type="add-user"/>
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <p>No se encontraron empleados disponibles</p>
        )}
      </Drawer>


      {/* Drawer to add worker */ }
      <Drawer
        title="Seleccione una persona para agregar al equipo"
        placement="bottom"
        closable={true}
        onClose={handleAddDrawerStatus}
        visible={addDrawerStatus}
        destroyOnClose={true}
        height={250}
      >
        {availableWorkers.length > 0 ? (
          <Form onSubmit={handleAddSubmit} layout="vertical">
            <FormItem label="Empleado" hasFeedback>
              {getFieldDecorator("employee", {
                rules: [{ required: true, message: "Seleccione" }]
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
          <p>No se encontraron empleados disponibles</p>
        )}
      </Drawer>

      {/* Drawer to report worker*/ }
      <Drawer
        title="Complete la información del reporte"
        placement="bottom"
        closable={true}
        onClose={handleReportDrawerStatus}
        visible={reportDrawerStatus}
        destroyOnClose={true}
        height={400}
      >
          <Form onSubmit={handleReportSubmit} layout="vertical">
            <FormItem label="Motivo de reporte" hasFeedback>
              {getFieldDecorator("workerReportedStatus", {
                rules: [{ required: true, message: "Seleccione el motivo" }]
              })(
                <Select style={{ width: "100%" }}>
                  {reportStatus.map(option => {
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
              {getFieldDecorator("workerReportedComments", {
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
                Confirmar reporte
                <Icon type="alert"/>
              </Button>
            </Form.Item>
          </Form>        
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
  { fetchWorkersByTeam, replaceWorkers, setSubstituteInfo, setReportWorkerInfo, addWorkerToTeam }
)(EnhancedSubstitutionForm);
