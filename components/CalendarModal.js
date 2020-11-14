import React, { useMemo } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';


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
      onRequestClose={close}
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
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>
              Anuluj
            </Text>
          </TouchableOpacity>
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