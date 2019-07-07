import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Table, Divider } from "antd";

import { fetchWorkersByTeam } from "../../actions/workerActions";

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
        <button>Cambiar</button>
        <Divider type="vertical" />
        <button>Reportar</button>
      </span>
    )
  }
];

const WorkDayPersons = ({ selectedTeam, workersByTeam, fetchWorkersByTeam }) => {

  // load workers when team changes
  useEffect(() => {
    if (selectedTeam) {
      fetchWorkersByTeam(selectedTeam);
    }
  }, [selectedTeam]);

  const workers = workersByTeam.map(workerByTeam => {
    //neccesary to remove warning from antd (every row should have a unique key)
    workerByTeam.key = workerByTeam.id;
    return workerByTeam;
  })

  return (
    <>
      { workers.length > 0 && <Table columns={columns} dataSource={workers} /> }
    </>
  );
};

const mapStateToProps = state => {
  const selectedTeam = state.teamsInfo.selectedTeam;
  const workersByTeam = state.workersInfo.workersByTeam;
  return {
    selectedTeam,
    workersByTeam
  };
};

export default connect(
  mapStateToProps,
  { fetchWorkersByTeam }
)(WorkDayPersons);
