import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { countDaysHoursAmount } from '../utils/generateHoursAmount';

const HoursSummary = ({ days }) => {

  const { totalHoursString, leaveDays } = useMemo(() => {
    const { hoursAmount, leaveDays } = days.reduce((prevValue, nextItem) => {
      let hoursAmount = prevValue.hoursAmount;
      let leaveDays = prevValue.leaveDays;

      if(nextItem.isLeave) {
        leaveDays += 1;
      } else if (nextItem.startHour) {
        hoursAmount += countDaysHoursAmount(nextItem.startHour, nextItem.endHour);
      }

      return {
        hoursAmount,
        leaveDays,
      }
    },{ hoursAmount: 0, leaveDays: 0});

    const fullHours = Math.ceil(hoursAmount);
    const aloneMinutes = Math.ceil((hoursAmount - fullHours) * 60);

    const totalHoursString = `${fullHours} godz., ${aloneMinutes} min.`;
    return {
      totalHoursString,
      leaveDays,
    };
  }, [days]);

  return ( 
    <View style={styles.container}>
      <View style={styles.data}>
        <Text>
          Liczba godzin: 
        </Text>
        <Text>
          {totalHoursString}
        </Text>
      </View>
      <View style={styles.data}>
        <Text>
          Dni urlopu: 
        </Text>
        <Text>
          {leaveDays}
        </Text>
      </View>
    </View>
  );
}

HoursSummary.propTypes = {
  days: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  data: { 
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
 
export default HoursSummary;