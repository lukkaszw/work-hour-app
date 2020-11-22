import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ActivityIndicator ,StyleSheet, View, Text, } from 'react-native';
import IconButton from './IconButton';
import InputField from './InputField';

import DAYS from '../constants/days';
import Colors from '../constants/colors';

import useDayHourForm from '../hooks/useDayHourForm';
import useFastAdd from '../hooks/useFastAdd';
import useRemoveDaysHours from '../hooks/useRemoveDaysHours';

const DayItem = ({ id, dayNr, month, year, dayOfWeek, startHour, endHour }) => {

  const [isEditing, setIsEditing] = useState(false);
  const settings = useSelector(state => state.settings);

  const handleStartEditMode = useCallback(() => setIsEditing(true), [setIsEditing]);
  const handleCancelEditMode = useCallback(() => setIsEditing(false), [setIsEditing]);

  const isHolidayStyles = dayOfWeek === 1 ? styles.holiday : null;

  const initialValues = useMemo(() => {

    const values = {
      startHour: startHour || '',
      endHour: endHour || '',
      dateString: `${year}-${month}-${dayNr}`,
    }

    if(values.startHour) {
      return values;
    }

    if(dayOfWeek === 1 && settings.workOnSunday) {
      values.startHour = settings.startOnSunday;
      values.endHour = settings.endOnSunday;
    } else if (dayOfWeek === 7 && settings.workOnSaturday) {
      values.startHour = settings.startOnSaturday;
      values.endHour = settings.endOnSaturday;
    } else if (dayOfWeek > 1 && dayOfWeek < 7) {
      values.startHour = settings.startHour;
      values.endHour = settings.endHour;
    }

    return values;
  }, [dayOfWeek, settings]);

  const {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    isSending,
    handleSendData,
  } = useDayHourForm({
    initialValues,
    isForEdit: !!id,
    isMonthPage: true,
    currentMonth: `${month}.${year}`,
    closeEditMode: handleCancelEditMode,
  });

  const {
    areInitialExists,
    isSendingFast,
    handleFastAdd,
  } = useFastAdd({
    initialValues,
    currentMonth: `${month}.${year}`,
  });

  const {
    isRemoving,
    handleRemoveDaysHours,
  } = useRemoveDaysHours(id);


  const isLoading = isSending || isSendingFast || isRemoving;

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
        {
          isEditing ?
            <InputField 
              value={startHourField.value}
              onChangeText={handleChangeStartHour}
              error={startHourField.error}
            />
            :
            <Text style={styles.hourText}>
              {startHour || '-'}
            </Text>
        }
      </View>
      <View style={styles.hours}>
        {
          isEditing ?
            <InputField 
              value={endHourField.value}
              onChangeText={handleChangeEndHour}
              error={endHourField.error}
            />
            :
            <Text style={styles.hourText}>
              {endHour || '-'}
            </Text>
        }
    
      </View>
      <View style={styles.actions}>
        {
          isLoading ?
            <ActivityIndicator 
              size='small'
              color={Colors.primary}
            />
            :
            (
              isEditing ?
                <>
                  <View style={styles.icon}>
                    <IconButton 
                      iconName='md-checkmark'
                      onPress={handleSendData}
                      color='green'
                    />
                  </View>
                  <View style={styles.icon}>
                    <IconButton 
                      iconName='md-close'
                      onPress={handleCancelEditMode}
                      color='red'
                    />
                  </View>
                </>
                :
                <>
                  <View style={styles.icon}>
                    <IconButton 
                      iconName='md-create'
                      onPress={handleStartEditMode}
                      color='deeppink'
                    />
                  </View>
                  {
                    !id ?
                      <View style={styles.icon}>
                        <IconButton 
                          iconName='ios-color-wand'
                          onPress={handleFastAdd}
                          color={areInitialExists ? 'dodgerblue' : 'gray'}
                        />
                      </View>
                      :
                      <View style={styles.icon}>
                        <IconButton 
                          iconName='ios-remove'
                          onPress={handleRemoveDaysHours}
                          color='red'
                        />
                      </View>
                  }
              </>
            )
        }
      </View>
    </View>
  );
}

DayItem.propTypes = {
  id: PropTypes.number,
  dayNr: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayName: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNameText: {
    textAlign: 'center',
  },
  holiday: {
    color: 'red',
  },
  hours: {
    flex: 1,
    alignItems: 'center',
  },
  hourText: {
    textAlign: 'center',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 6,
  }
});
 
export default DayItem;