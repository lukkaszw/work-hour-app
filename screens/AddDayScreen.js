import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import InlineButton from '../components/InlineButton';
import CalendarModal from '../components/CalendarModal';
import HourSettings from '../components/HourSettings';

import useDayHourForm from '../hooks/useDayHourForm';

import Colors from '../constants/colors';

const AddDayScreen = () => {

  const currentMonth = useSelector(state => state.days.month);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleOpenCalendar = useCallback(() => {
    setIsCalendarVisible(true);
  }, [setIsCalendarVisible]);

  const handleCloseCalendar = useCallback(() => {
    setIsCalendarVisible(false);
  }, [setIsCalendarVisible]);

  const {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    handleSetDate,
    handleSendData,
    dateString,
    isSending,
  } = useDayHourForm({
    currentMonth,
  });


  return ( 
    <View style={styles.screen}>
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
      <View style={styles.dateInfo}>
        <Text style={styles.dateText}>
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
  dateChangeBtn: {
    marginLeft: 20,
  },
  dateInfo: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
  },  
  btnWrapper: {
    marginTop: 60,
  },
});
 
export default AddDayScreen;