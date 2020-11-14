import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { addDay } from '../store/api-requests/api-requests';

import moment from 'moment';

const useDayHourForm = ({
  initialValues,
  currentMonth,
  isForEdit,
}) => {

  const dispatch = useDispatch();

  //fields
  const [startHourField, setStartHourField] = useState({
    value: initialValues ? initialValues.startHour : '',
    error: false,
  });

  const [endHourField, setEndHourField] = useState({
    value: initialValues ? initialValues.endHour : '',
    error: false,
  });

  const [dateString, setDateString] = useState(initialValues ? initialValues.dateString : moment().format('YYYY-MM-DD'));

  //sendingStatus
  const [isSending, setIsSending] = useState(false);

  //handlers
  const handleChangeStartHour = useCallback((text) => {
    setStartHourField({
      value: text,
      error: false,
    });
  }, [setStartHourField]);

  const handleChangeEndHour = useCallback((text) => {
    setEndHourField({
      value: text,
      error: false,
    });
  }, [setEndHourField]);

  const handleSetDate = useCallback((dateObj) => {
    setDateString(dateObj.dateString);
  }, [setDateString])

  const handleSendData = useCallback(() => {
    if(startHourField.error || endHourField.error) {
      return;
    }

    if(startHourField.value.length === 0) {
      setStartHourField(prevValue => ({
        value: prevValue.value,
        error: true,
      }));
    }

    if(endHourField.value.length === 0) {
      setEndHourField(prevValue => ({
        value: prevValue.value,
        error: true,
      }));
    }

    setIsSending(true);

    dispatch(addDay({ 
      startHour: startHourField.value, 
      endHour: endHourField.value, 
      dateString,
      currentMonth,
    }))
      .then(result => {
        setIsSending(false);
      })
      .catch(error => {
        console.log(error);

        setIsSending(false);
        Alert.alert(
          'Błąd!',
          'Nie udało się zapisać godzin pracy!',
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