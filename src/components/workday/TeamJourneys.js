import React from 'react';
import EndWorkDaySelectors from '../workday/endWorkDaySelectors';
import OpenedJourneys from './openedJourneys';
import { Typography } from 'antd';

const { Title } = Typography;

const TeamJourneys = () => {
  return ( 
    <>
      <Title>Cerrar Jornadas</Title>
      <EndWorkDaySelectors />
      <OpenedJourneys />
    </>
   );
}
 
export default TeamJourneys;