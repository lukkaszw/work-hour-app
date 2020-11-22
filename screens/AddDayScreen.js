import React, { useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import moment from 'moment';

import InlineButton from '../components/InlineButton';
import CalendarModal from '../components/CalendarModal';
import HourSettings from '../components/HourSettings';

import useDayHourForm from '../hooks/useDayHourForm';

import Colors from '../constants/colors';

const AddDayScreen = () => {

  const currentMonth = useSelector(state => state.days.month);
  const settings = useSelector(state => state.settings);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleOpenCalendar = useCallback(() => {
    setIsCalendarVisible(true);
  }, [setIsCalendarVisible]);

  const handleCloseCalendar = useCallback(() => {
    setIsCalendarVisible(false);
  }, [setIsCalendarVisible]);

  const todayDayOfWeek = moment().weekday() + 1;

  const todayInitialValues = useMemo(() => {

    const values = {
      startHour: '',
      endHour: '',
    }

    if(todayDayOfWeek === 1 && settings.workOnSunday) {
      values.startHour = settings.startOnSunday;
      values.endHour = settings.endOnSunday;
    } else if (todayDayOfWeek === 7 && settings.workOnSaturday) {
      values.startHour = settings.startOnSaturday;
      values.endHour = settings.endOnSaturday;
    } else if (todayDayOfWeek > 1 && todayDayOfWeek < 7) {
      values.startHour = settings.startHour;
      values.endHour = settings.endHour;
    }

    return values;
  }, [todayDayOfWeek, settings]);

  const {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    handleSetDate,
    handleSendData,
    dateString,
    isLeave,
    handleToggleLeave,
  } = useDayHourForm({
    currentMonth,
    initialValues: {
      startHour: todayInitialValues.startHour,
      endHour: todayInitialValues.endHour,
    }
  });


  return ( 
    <View style={styles.screen}>
      <View style={styles.leaveStatus}>
        <Text style={{ ...styles.text, ...styles.leaveText}}>
          Urlop wypoczynkowy
        </Text>
        <Switch 
          onValueChange={handleToggleLeave}
          value={isLeave}
        />
      </View>
      {
        !isLeave &&
          <HourSettings 
            headerText='Podaj godziny pracy:'
            fromValue={startHourField.value}
            onFromChangeHandler={handleChangeStartHour}
            fromError={startHourField.error}
            toValue={endHourField.value}
            onToChangeHandler={handleChangeEndHour}
            toError={endHourField.error}
            addInfo
          />
      }
      <View style={styles.dateInfo}>
        <Text style={styles.text}>
          Data: {dateString}
        </Text>
        <InlineButton 
          style={styles.dateChangeBtn}
          title="Zmień"
          onPress={handleOpenCalendar}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button 
          title="Dodaj godziny"
          onPress={handleSendData}
          color={Colors.primary}
        />
      </View>
      <CalendarModal 
        date={dateString}
        onChangeDate={handleSetDate}
        isOpen={isCalendarVisible}
        onClose={handleCloseCalendar}
      />
    </View>
  );
}

AddDayScreen.navigationOptions = {
  headerTitle: 'Dodaj godziny',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveStatus: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },  
  dateChangeBtn: {
    marginLeft: 20,
  },
  dateInfo: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  leaveText: {
    marginRight: 10,
  },  
  btnWrapper: {
    marginTop: 60,
  },
});
 
export default AddDayScreen;