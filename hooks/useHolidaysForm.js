import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setOverdueHolidays, setCurrentHolidays } from '../store/actions/actionCreators';
import { checkHolidays } from '../db/db';

const useHolidaysForm = () => {

  const dispatch = useDispatch();

  const [overdueError, setOverdueError] = useState(false);
  const [currentError, setCurrentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [holidays, setHolidays] = useState(null);

  const overdueHolidays = useSelector(state => state.holidays.overdueHolidays);
  const currentHolidays = useSelector(state => state.holidays.currentHolidays);

  const clearCurrentSettings = useCallback(() => {
    if(overdueError) {
      setOverdueError(false);
    }
    if(holidays) {
      setHolidays(null);
    }
  }, [setOverdueError, setHolidays, overdueError, holidays]);

  const handleChangeOverdueHolidays = useCallback((text) => {
    clearCurrentSettings();
    dispatch(setOverdueHolidays(text));
  }, [dispatch, setOverdueHolidays, clearCurrentSettings]);

  const handleChangeCurrentHolidays = useCallback((text) => {
    clearCurrentSettings();
    dispatch(setCurrentHolidays(text));
  }, [dispatch, setCurrentHolidays, clearCurrentSettings]);

  const handleCheckHolidays = useCallback(() => {

    const overdue = overdueHolidays.length === 0 ? 0 : parseInt(overdueHolidays);
    const current = parseInt(currentHolidays);

    if(isNaN(overdue)) {
      setOverdueError(true);
      return;
    }

    if(isNaN(current)) {
      setCurrentError(true);
      return;
    }

    setIsLoading(true);

    checkHolidays()
      .then((result) => {
        const holidaysCount = parseInt(result.rows._array[0].holidays);

        setIsLoading(false);
        setHolidays({
          used: holidaysCount,
          left: (overdue + current) - holidaysCount,
        });
        AsyncStorage.setItem('holidays', JSON.stringify({ overdueHolidays, currentHolidays }));
      })  
      .catch(error => {
        setIsLoading(false);
        Alert.alert(
          'Błąd!',
          'Nie udało się sprawdzić ilości pozostałego urlopu! Sprawdź później!',
        );
      })

  }, [overdueHolidays, currentHolidays, setOverdueError, setCurrentError]); 


  return {
    overdueHolidays,
    currentHolidays,
    overdueError,
    currentError,
    holidays,
    isLoading,
    handleChangeCurrentHolidays,
    handleChangeOverdueHolidays,
    handleCheckHolidays,
  }
}

export default useHolidaysForm;