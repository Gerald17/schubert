import React from "react";

//Ant
import { Row } from "antd";

//Custom
import WorkDayForm from './workDaySelectors';
import WorkDayPersons from "./workDayPersons";

const WorkDay = () => {
  return (
    <>
      <h1>Crear Jornada</h1>
      <Row>
        <WorkDayForm/>
        <WorkDayPersons/>
      </Row>
    </>
  );
};

export default WorkDay;
