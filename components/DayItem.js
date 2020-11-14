import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Text, } from 'react-native';

import DAYS from '../constants/days';

const DayItem = ({ id, dayNr, month, dayOfWeek, startHour, endHour }) => {

  const isHolidayStyles = dayOfWeek === 1 ? styles.holiday : null;
  return ( 
    <View style={styles.item}>
      <View style={styles.dayNr}>
        <Text>
          {dayNr}.{month}
        </Text>
      </View>
      <View style={styles.dayName}>
        <Text style={{...styles.dayNameText, ...isHolidayStyles}}>
          {DAYS[dayOfWeek]}
        </Text>
      </View>
      <View style={styles.hours}>
        <Text style={styles.hourText}>
          {startHour || '-'}
        </Text>
      </View>
      <View style={styles.hours}>
        <Text style={styles.hourText}>
          {endHour || '-'}
        </Text>
      </View>
      <View style={styles.actions}>

      </View>
    </View>
  );
}

DayItem.propTypes = {
  id: PropTypes.number,
  dayNr: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  dayOfWeek: PropTypes.number.isRequired,
  startHour: PropTypes.string,
  endHour: PropTypes.string,
};

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  dayNr: {
    width: 45,
  },
  dayName: {
    width: 40,
  },
  dayNameText: {
    textAlign: 'center',
  },
  holiday: {
    color: 'red',
  },
  hours: {
    flex: 1,
  },
  hourText: {
    textAlign: 'center',
  },
  actions: {
    flex: 1,
  }
});
 
export default DayItem;