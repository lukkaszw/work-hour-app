import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import DayItem from './DayItem';

const DaysList = ({ days }) => {
  return ( 
    <View>
      {
        days.map(( dayItem ) => (
          <DayItem 
            key={dayItem.dayNr + dayItem.month}
            {...dayItem}
          />
        ))
      }
    </View>
  );
}

DaysList.propTypes = {
  days: PropTypes.array.isRequired,
};
 
export default DaysList;