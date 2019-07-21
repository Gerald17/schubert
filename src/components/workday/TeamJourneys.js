import React from 'react';
import EndWorkDaySelectors from '../workday/endWorkDaySelectors';
import OpenedJourneys from './openedJourneys';

const TeamJourneys = () => {
  return ( 
    <>
      <EndWorkDaySelectors />
      <OpenedJourneys />
    </>
   );
}
 
export default TeamJourneys;