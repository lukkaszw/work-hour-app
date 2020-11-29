import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import DayItem from './DayItem';
import CONSTANT_HOLIDAYS from '../constants/holidays';

const DaysList = ({ days, mobileHolidays }) => {

  const holidays = CONSTANT_HOLIDAYS.concat(mobileHolidays);


  return ( 
    <View>
      {
        days.map(( dayItem ) => (
          <DayItem 
            key={dayItem.dayNr + dayItem.month + dayItem.year + dayItem.dayOfWeek}
            {...dayItem}
            isHoliday={dayItem.dayOfWeek === 1 || holidays.includes(`${dayItem.dayNr}.${dayItem.month}`)}
          />
        ))
      }
    </View>
  );
}

DaysList.propTypes = {
  days: PropTypes.array.isRequired,
  mobileHolidays: PropTypes.array.isRequired,
};
 
export default DaysList;