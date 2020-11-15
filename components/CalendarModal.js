import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import InlineButton from './InlineButton';


const CalendarModal = ({
  isOpen,
  onClose,
  date,
  onChangeDate,
}) => {

  const markedDates = {
    [date]: { selected: true, selectedColor: 'red' },
  };

  return ( 
    <Modal
      animationType="slide"
      visible={isOpen}
    >
      <View style={styles.view}>
        <Calendar 
          markedDates={markedDates}
          firstDay={1}
          onDayPress={day => {
            onChangeDate(day);
            onClose();
          }}
        />
        <View style={styles.closeBtn}>
          <InlineButton 
            onPress={onClose}
            title="Anuluj"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    marginTop: 20,
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: 'red',
  }
});
 
export default CalendarModal;