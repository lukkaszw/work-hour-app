import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { countDaysHoursAmount } from '../utils/generateHoursAmount';

const HoursSummary = ({ days }) => {

  const totalHours = useMemo(() => {
    const hoursAmount = days.reduce((prevValue, nextItem) => {
      if(!nextItem.startHour) {
        return prevValue + 0;
      }

      const dayHourAmount = countDaysHoursAmount(nextItem.startHour, nextItem.endHour);
      return prevValue + dayHourAmount;
    }, 0);

    const fullHours = Math.ceil(hoursAmount);
    const aloneMinutes = Math.ceil((hoursAmount - fullHours) * 60);

    const totalHoursString = `${fullHours} godz., ${aloneMinutes} min.`;
    return totalHoursString;
  }, [days]);

  return ( 
    <View style={styles.container}>
      <Text>
        Liczba godzin: 
      </Text>
      <Text>
        {totalHours}
      </Text>
    </View>
  );
}

HoursSummary.propTypes = {
  days: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
});
 
export default HoursSummary;