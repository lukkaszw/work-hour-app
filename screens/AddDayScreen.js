import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import InlineButton from '../components/InlineButton';
import InputField from '../components/InputField';
import CalendarModal from '../components/CalendarModal';

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
      <Text style={styles.topText}>
        Podaj godziny pracy:
      </Text>
      <View style={styles.hoursContainer}>
        <View style={styles.row}>
          <Text style={styles.hourLabel}>
            od:
          </Text>
          <InputField 
            value={startHourField.value}
            onChangeText={handleChangeStartHour}
            inputStyles={styles.additionalInputStyles}
            keyboardType="number-pad"
          />
        </View>
      <View style={styles.row}>
        <Text  style={styles.hourLabel}>
          do:
        </Text>
        <InputField 
          value={endHourField.value}
          onChangeText={handleChangeEndHour}
          inputStyles={styles.additionalInputStyles}
          keyboardType="number-pad"
        />
      </View>

    </View>
    <Text style={styles.formatInfo}>
        Proszę podać format: '01:22', '00:22', '23:33'...
    </Text>
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
  topText: {
    fontSize: 18,
    marginBottom: 20,
  },  
  hoursContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formatInfo: {
    fontSize: 12,
    marginTop: 20,
    marginBottom: 60,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourLabel: {
    fontSize: 18,
    marginRight: 12,
  },
  additionalInputStyles: {
    width: 55,
    textAlign: 'center',
    fontSize: 18,
  },
  dateChangeBtn: {
    marginLeft: 20,
  },
  dateInfo: {
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