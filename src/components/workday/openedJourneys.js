import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Table, Button } from "antd";

const OpenedJourneys = ({ storedOpenedJourneys, match: { path } }) => {

  const columns = [
    {
      title: "Fecha de Inicio",
      dataIndex: "startDate",
      key: "startDate"
    },
    {
      title: "Equipo",
      dataIndex: "workerTeam",
      key: "name",
      render: workerTeam => workerTeam.name
    },
    {
      title: "Vehículo",
      dataIndex: "workerTeam",
      key: "vehicleId",
      render: workerTeam => workerTeam.vehicleId
    },
    {
      title: "Acción",
      key: "action",
      render: ({ id }) => (
        <span>
          { <Button><Link to={`${path}/${id}`}>Cerrar</Link></Button> }
        </span>
      )
    }
  ];

  return (
    <>
      {storedOpenedJourneys.length > 0 && 
        <Table columns={columns} dataSource={storedOpenedJourneys} rowKey="id" title={() => "Jornadas Abiertas"} bordered/>
      }
    </>
  );
};


const mapStateToProps = state => {
  const storedOpenedJourneys = state.journeyInfo.openedJourneys;
  return {
    storedOpenedJourneys
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(OpenedJourneys));
