import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import InputField from './InputField';
import DayItemText from './DayItemText';
import DayItemActions from './DayItemActions';

import DAYS from '../constants/days';
import Colors from '../constants/colors';

import useDayHourForm from '../hooks/useDayHourForm';
import useFastAdd from '../hooks/useFastAdd';
import useRemoveDaysHours from '../hooks/useRemoveDaysHours';
import useSetDayAsLeave from '../hooks/useSetDayAsLeave';

import { APP_WIDTH } from '../constants/sizes';

const DayItem = ({ id, dayNr, month, year, dayOfWeek, isLeave, isSickLeave, startHour, endHour }) => {

  const [areOptionsActive, setAreOptionsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const settings = useSelector(state => state.settings);

  const handleStartEditMode = useCallback(() => setIsEditing(true), [setIsEditing]);
  const handleCancelEditMode = useCallback(() => setIsEditing(false), [setIsEditing]);
  const handleToggleOptions = useCallback(() => setAreOptionsActive(prevValue => {
    if(prevValue) {
      setIsEditing(false);
    }
    return !prevValue
  }), [setAreOptionsActive, setIsEditing]);

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

  const {
    isSettingLeave,
    handleSetLeave,
  } = useSetDayAsLeave({
    id,
    isAlreadyLeave: !!isLeave,
    dateString: initialValues.dateString,
    currentMonth: `${month}.${year}`,
  });

  
  const {
    isSettingLeave: isSettingSickLeave,
    handleSetLeave: handleSetSickLeave,
  } = useSetDayAsLeave({
    id,
    isAlreadyLeave: !!isSickLeave,
    dateString: initialValues.dateString,
    currentMonth: `${month}.${year}`,
    isAboutSick: true,
  })


  const isLoading = isSending || isSendingFast || isRemoving || isSettingLeave || isSettingSickLeave;

  return ( 
    <View style={styles.item}>
      <View style={styles.dayNr}>
        <DayItemText>
          {dayNr}.{month}
        </DayItemText>
      </View>
      <View style={styles.dayName}>
        <DayItemText style={{...styles.dayNameText, ...isHolidayStyles}}>
          {DAYS[dayOfWeek]}
        </DayItemText>
      </View>
      <View style={styles.hours}>
        {
          isEditing ?
            <InputField 
              inputStyles={styles.inputStyles}
              value={startHourField.value}
              onChangeText={handleChangeStartHour}
              error={startHourField.error}
              keyboardType="number-pad"
            />
            :
            <DayItemText style={styles.hourText}>
              {isLeave ? 'UW' : (isSickLeave ? 'L4' : startHour || '-')}
            </DayItemText>
        }
      </View>
      <View style={styles.hours}>
        {
          isEditing ?
            <InputField 
              inputStyles={styles.inputStyles}
              value={endHourField.value}
              onChangeText={handleChangeEndHour}
              error={endHourField.error}
              keyboardType="number-pad"
            />
            :
            <DayItemText style={styles.hourText}>
              {isLeave ? 'UW' : (isSickLeave ? 'L4' : endHour || '-')}
            </DayItemText>
        }
      </View>
      <View style={styles.optionsTrigger}>
        <View style={styles.icon}>
          <IconButton 
            iconName={areOptionsActive ? 'md-close' : 'ios-construct'}
            onPress={handleToggleOptions}
            color={Colors.primary}
            size={25}
          />
        </View>
      </View>
      {
        areOptionsActive &&
          <DayItemActions 
            id={id}
            isLoading={isLoading} 
            isLeave={isLeave}
            isSickLeave={isSickLeave}
            isEditing={isEditing}
            areInitialExists={areInitialExists}
            onCancelEditMode={handleCancelEditMode} 
            onStartEditMode={handleStartEditMode}
            onSendData={handleSendData}  
            onFastAdd={handleFastAdd} 
            onRemoveDaysHours={handleRemoveDaysHours} 
            onSetLeave={handleSetLeave}
            onSetSickLeave={handleSetSickLeave}
          />
      }
    </View>
  );
}

DayItem.propTypes = {
  id: PropTypes.number,
  dayNr: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  isLeave: PropTypes.number,
  isSickLeave: PropTypes.number,
  year: PropTypes.number.isRequired,
  dayOfWeek: PropTypes.number.isRequired,
  startHour: PropTypes.string,
  endHour: PropTypes.string,
};

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  inputStyles: {
    fontSize: 17,
  },
  dayNr: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayName: {
    width: 50,
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
  optionsTrigger: {
    width: 50,
    justifyContent: 'center',
  },  
  icon: {
    marginHorizontal: 3,
  }
});
 
export default DayItem;