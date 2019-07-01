import React from "react";

//Ant
import { Row } from "antd";

//Custom
import WorkDayForm from './workDayForm';

const WorkDay = () => {
  return (
    <>
      <h1>Crear Jornada</h1>
      <Row>
        <WorkDayForm/>
      </Row>
    </>
  );
};

export default WorkDay;
