import { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { addDay, editDayByDate } from '../store/api-requests/api-requests';
import useHoursSettings from './useHoursSettings';

import moment from 'moment';

const useDayHourForm = ({
  initialValues,
  currentMonth,
  isForEdit,
  isMonthPage,
  closeEditMode,
}) => {

  const dispatch = useDispatch();

  const compExists = useRef(true);

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

  const [dateString, setDateString] = useState(initialValues && initialValues.dateString ? initialValues.dateString : moment().format('YYYY-MM-DD'));

  const [isLeave, setIsLeave] = useState(false);
  const [isSickLeave, setIsSickLeave] = useState(false);

  //handlers
  const handleToggleLeave = useCallback(() => {
    setIsLeave(prevValue => {
      if(prevValue === false) {
        setIsSickLeave(false);
      } 
      return !prevValue;
    }); 
  },[setIsLeave, setIsSickLeave]);

  const handleToggleSickLeave = useCallback(() => {
    setIsSickLeave(prevValue => {
      if(prevValue === false) {
        setIsLeave(false);
      }
      return !prevValue;
    }); 
  }, [setIsSickLeave, setIsLeave]);
  

  //sendingStatus
  const [isSending, setIsSending] = useState(false);

  const handleSetDate = useCallback((dateObj) => {
    setDateString(dateObj.dateString);
  }, [setDateString]);

  //submit action
  const handleSendData = useCallback(() => {
    if(!isLeave && !isSickLeave) {
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
    }

    setIsSending(true);

    const data = { 
      startHour: (isLeave || isSickLeave) ? '' : startHourField.value, 
      endHour: (isLeave || isSickLeave) ? '' : endHourField.value, 
      dateString,
      currentMonth,
      isLeave: isLeave ? 1 : 0,
      isSickLeave: isSickLeave ? 1 : 0,
    };

    if(isForEdit) {
      dispatch(editDayByDate(data))
        .then(() => {
          if(compExists) {
            setIsSending(false);
            closeEditMode();
          }
        })
        .catch((error) => {
          Alert.alert(
            'Błąd!',
            'Nie udało się zaktualizować poprawnie godzin pracy!',
          );
        }); 
    } else {
      dispatch(addDay(data))
      .then(result => {
        if(compExists) {
          setIsSending(false);
          if(isMonthPage) {
            closeEditMode();
          }
        }

        if(!isMonthPage) {
          Alert.alert(
            'Sukces!',
            'Dodałeś poprawnie godziny!'
          );
        }
      })
      .catch(error => {
        console.log(error);

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
                  console.log(error);

                  Alert.alert(
                    'Błąd!',
                    'Nie udało się zaktualizować poprawnie godzin pracy!',
                  );
                });
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
    }



  }, [startHourField, endHourField, setEndHourField, setStartHourField, setIsSending, dateString, currentMonth, isLeave, closeEditMode, editDayByDate, addDay, dispatch, isForEdit, isMonthPage, isSickLeave]);

  return {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    isSending,
    dateString,
    handleSetDate,
    handleSendData,
    handleToggleLeave,
    handleToggleSickLeave,
    isLeave,
    isSickLeave,
  }
}

export default useDayHourForm;