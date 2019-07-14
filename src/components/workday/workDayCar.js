import React from "react";
import { connect } from "react-redux";

import { Card, Icon, Avatar, List, Typography, Button } from "antd";

const { Meta } = Card;

const WorkDayCar = ({ teamsData, selectedTeam }) => {
  const team =
    teamsData.length > 0
      ? teamsData.find(team => team.id === selectedTeam)
      : null;
  return (
    <>
      {team && (
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://static.vecteezy.com/system/resources/previews/000/420/310/large_2x/vector-truck-icon.jpg"
            />
          }
          actions={[            
            <Button>Cambiar</Button>,
            <Button>Reportar</Button>
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://images.unsplash.com/photo-1490670096971-8005fec55d50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            }
            title={team.vehicle.model}
            description={team.vehicle.id}
          />
          <br />
          <Card type="inner" title="Info">
            <List itemLayout="vertical">
              <List.Item>
                <Typography.Text>Año {team.vehicle.year} </Typography.Text>
                <br />
                <Typography.Text>Km {team.vehicle.kilometers} </Typography.Text>
                <br />
                <Typography.Text>Mi {team.vehicle.mileage} </Typography.Text>
                <br />
                <Typography.Text>Estado {team.vehicle.state} </Typography.Text>
              </List.Item>
            </List>
          </Card>
        </Card>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const selectedTeam = state.teamsInfo.selectedTeam;
  const teamsData = state.teamsInfo.teamsData;
  return {
    selectedTeam,
    teamsData: teamsData || null
  };
};

export default connect(
  mapStateToProps,
  null
)(WorkDayCar);
