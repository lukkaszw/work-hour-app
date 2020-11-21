import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { addDay, editDayByDate } from '../store/api-requests/api-requests';
import changeHourInputText from '../utils/changeHourInputText';
import { validateHourFormat } from '../utils/validators';
import useHoursSettings from './useHoursSettings';

import moment from 'moment';

const useDayHourForm = ({
  initialValues,
  currentMonth,
  isForEdit,
}) => {

  const dispatch = useDispatch();

  const {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    setStartHourField,
    setEndHourField,
  } = useHoursSettings({
    initialValues,
  });

  const [dateString, setDateString] = useState(initialValues ? initialValues.dateString : moment().format('YYYY-MM-DD'));

  //sendingStatus
  const [isSending, setIsSending] = useState(false);

  const handleSetDate = useCallback((dateObj) => {
    setDateString(dateObj.dateString);
  }, [setDateString])

  //submit action
  const handleSendData = useCallback(() => {
    if(startHourField.error || endHourField.error) {
      return;
    }

    if(startHourField.value.length === 0) {
      setStartHourField(prevValue => ({
        value: prevValue.value,
        error: true,
      }));
      return;
    }

    if(endHourField.value.length === 0) {
      setEndHourField(prevValue => ({
        value: prevValue.value,
        error: true,
      }));
      return;
    }

    setIsSending(true);

    const data = { 
      startHour: startHourField.value, 
      endHour: endHourField.value, 
      dateString,
      currentMonth,
    };

    dispatch(addDay(data))
      .then(result => {
        setIsSending(false);
        Alert.alert(
          'Sukces!',
          'Dodałeś poprawnie godziny!'
        );
      })
      .catch(error => {
        let message = 'Nie udało się zapisać godzin pracy!';

        const alertBtns = [{
          text: 'Anuluj',
        }]

        if(error.message.includes('UNIQUE constraint failed')) {
          message = 'Zapisano już godzine na dany dzień. Czy chcesz edytować?',
          alertBtns.push({
            text: 'Edytuj',
            onPress: () => {
              setIsSending(true);
              dispatch(editDayByDate(data))
                .then(result => {
                  setIsSending(false);
                  Alert.alert(
                    'Sukces!',
                    'Godziny pracy zakutalizowane poprawnie!',
                  );
                })
                .catch(error => {
                  console.log(error.message);
                })
            },
          })
        }

        setIsSending(false);
        Alert.alert(
          'Błąd!',
          message,
          alertBtns
        );
      });

  }, [startHourField, endHourField, setEndHourField, setStartHourField, dateString, currentMonth]);

  return {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    isSending,
    dateString,
    handleSetDate,
    handleSendData,
  }
}

export default useDayHourForm;