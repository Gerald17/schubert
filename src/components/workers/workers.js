import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table, Divider } from "antd";

import { fetchWorkers } from "../../actions/workerActions";

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
    title: 'Acción',
    key: 'action',
    render: () => (
      <span>
        <button>Editar</button>
        <Divider type="vertical" />
        <button>Eliminar</button>
      </span>
    )
  }
];

const Workers = ({ workers, fetchWorkers }) => {

  // load workers
  useEffect(() => {
    fetchWorkers();
  }, []);

  const workersKey = workers.map(workers => {
    //neccesary to remove warning from antd (every row should have a unique key)
    workers.key = workers.id;
    return workers;
  })

  return (
    <>
      { workersKey.length > 0 && <Table columns={columns} dataSource={workersKey} /> }
    </>
  );
};

const mapStateToProps = state => {
  const workers = state.workersInfo.workers;
  return {
    workers
  };
};

export default connect(
  mapStateToProps,
  { fetchWorkers }
)(Workers);
