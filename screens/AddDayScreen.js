import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import InlineButton from '../components/InlineButton';
import InputField from '../components/InputField';
import CalendarModal from '../components/CalendarModal';

import useDayHourForm from '../hooks/useDayHourForm';


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
      <View style={styles.row}>
        <InputField 
          value={startHourField.value}
          onChangeText={handleChangeStartHour}
          label="Godz. początkowa:"
          inputStyles={styles.additionalInputStyles}
        />
      </View>
     <View style={styles.row}>
       <InputField 
          value={endHourField.value}
          onChangeText={handleChangeEndHour}
          label="Godz. końcowa:"
          inputStyles={styles.additionalInputStyles}
       />
     </View>
      <View style={styles.dateInfo}>
        <Text>
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
          title="Dodaj"
          onPress={handleSendData}
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
  row: {
    margin: 20,
  },
  additionalInputStyles: {
    width: 55,
    textAlign: 'center',
    fontSize: 18,
  },
  dateChangeBtn: {
    marginLeft: 10,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnWrapper: {
    marginTop: 30,
  },
});
 
export default AddDayScreen;