import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

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
      <View>
        <Text>
          Data: {dateString}
        </Text>
        <Button 
          title="Zmień"
          onPress={handleOpenCalendar}
        />
      </View>
      <View>
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
});
 
export default AddDayScreen;