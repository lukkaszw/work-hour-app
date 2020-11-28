import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import DayItemText from './DayItemText';
import { countDaysHoursAmount } from '../utils/generateHoursAmount';

const HoursSummary = ({ days }) => {

  const { totalHoursString, leaveDays, sickLeaveDays } = useMemo(() => {
    const { hoursAmount, leaveDays, sickLeaveDays } = days.reduce((prevValue, nextItem) => {
      let hoursAmount = prevValue.hoursAmount;
      let leaveDays = prevValue.leaveDays;
      let sickLeaveDays = prevValue.sickLeaveDays;

      if(nextItem.isLeave) {
        leaveDays += 1;
      } else if(nextItem.isSickLeave) {
        sickLeaveDays += 1;
      } else if (nextItem.startHour) {
        hoursAmount += countDaysHoursAmount(nextItem.startHour, nextItem.endHour);
      }

      return {
        hoursAmount,
        leaveDays,
        sickLeaveDays,
      }
    },{ hoursAmount: 0, leaveDays: 0, sickLeaveDays: 0 });

    const fullHours = Math.ceil(hoursAmount);
    const aloneMinutes = Math.ceil((hoursAmount - fullHours) * 60);

    const totalHoursString = `${fullHours} godz., ${aloneMinutes} min.`;
    return {
      totalHoursString,
      leaveDays,
      sickLeaveDays,
    };
  }, [days]);

  return ( 
    <View style={styles.container}>
      <View style={styles.data}>
        <DayItemText>
          Liczba godzin: 
        </DayItemText>
        <DayItemText>
          {totalHoursString}
        </DayItemText>
      </View>
      <View style={styles.data}>
        <DayItemText>
          Dni urlopu: 
        </DayItemText>
        <DayItemText>
          {leaveDays}
        </DayItemText>
      </View>
      <View style={styles.data}>
        <DayItemText>
          Dni na L4: 
        </DayItemText>
        <DayItemText>
          {sickLeaveDays}
        </DayItemText>
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