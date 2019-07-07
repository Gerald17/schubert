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

const WorkDayPersons = ({ selectedTeam, workers, fetchWorkersByTeam }) => {

  const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);

  // load workers when team changes
  useEffect(() => {
    if (selectedTeam) {
      fetchWorkersByTeam(selectedTeam);
    }
  }, [selectedTeam]);

  const workersKey = workers.map(workers => {
    //neccesary to remove warning from antd (every row should have a unique key)
    workers.key = workers.id;
    return workers;
  })
  
  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      { workersKey.length > 0 && 
        <>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          <Table rowSelection={rowSelection} columns={columns} dataSource={workersKey} /> 
        </>
      }
    </>
  );
};

const mapStateToProps = state => {
  const selectedTeam = state.teamsInfo.selectedTeam;
  const workers = state.workersInfo.workers;
  return {
    selectedTeam,
    workers
  };
};

export default connect(
  mapStateToProps,
  { fetchWorkersByTeam }
)(WorkDayPersons);
