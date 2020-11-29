import { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import { addDay, editDayByDate } from '../store/api-requests/api-requests';

const useSetDayAsLeave = ({ dateString, currentMonth, id, isAlreadyLeave, isAboutSick, closeOptions }) => {

  const dispatch = useDispatch();

  const compExists = useRef(true);
  const [isSettingLeave, setIsSettingLeave] = useState(false);

  const handleSetLeave = useCallback(() => {

    if(isAlreadyLeave) {
      return;
    }

    const data = { 
      startHour: '', 
      endHour: '', 
      isLeave: isAboutSick ? 0 : 1,
      isSickLeave: isAboutSick ? 1 : 0,
      dateString,
      currentMonth,
    };

    const action = id ? editDayByDate : addDay;

    setIsSettingLeave(true);

    dispatch(action(data))
      .then(() => {
        if(compExists) {
          setIsSettingLeave(false);
          closeOptions();
        }
      })
      .catch(() => {
        setIsSettingLeave(false);
        Alert.alert(
          'Błąd!',
          'Nie udało się ustawić urlopu! Spróbuj ponownie później!',
        );
      });

  }, [compExists, setIsSettingLeave, id, dateString, currentMonth, isAlreadyLeave, isAboutSick, closeOptions]);

  return {
    isSettingLeave,
    handleSetLeave,
  }
}

export default useSetDayAsLeave;