import * as actionCreators from '../actions/actionCreators';
import { getSpecificDays, insertDay, updateDayByDate, getYears, deleteDay } from '../../db/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getMonthFromDate from '../../utils/getMonthFromDate';

import moment from 'moment';

export const getDays = ({ startDate, endDate, month }) => {
  return async (dispatch) => {  

    dispatch(actionCreators.startDaysLoading());
    try {
      const result = await getSpecificDays({ startDate, endDate });
      dispatch(actionCreators.setDays({ days: result.rows._array, month  }));
    } catch (error) {
      dispatch(actionCreators.setDaysError('Błąd! Nie udało się pobrać godzin pracy z danego miesiąca!'));
    }
  }
}

export const addDay = ({ startHour, endHour, dateString, isLeave, isSickLeave, currentMonth }) => {
  console.log(isSickLeave);

  const date = moment(dateString);
  const month = date.month() + 1;
  const year = date.year();
  return (dispatch) => {  
     return insertDay({ dateString, startHour, endHour, isLeave, isSickLeave, month, year })
      .then(result => {
        const resultMonth = getMonthFromDate(dateString);
        if(resultMonth === currentMonth) {
          dispatch(actionCreators.addDay({
            id: result.insertId,
            date: dateString,
            isLeave,
            isSickLeave,
            startHour,
            endHour,
            year,
          }));
        }
        dispatch(actionCreators.setOutOfDateHolidays(true));
        dispatch(actionCreators.addYear({ year }));
        return result;
      });
  }
}

export const editDayByDate = ({  startHour, endHour, isLeave, isSickLeave, dateString, currentMonth }) => {
  return (dispatch) => {
    return updateDayByDate({ startHour, endHour, isLeave, isSickLeave, dateString })
      .then(result => {
        const resultMonthDate = getMonthFromDate(dateString);
        if(resultMonthDate === currentMonth) {
          dispatch(actionCreators.editDay({
            startHour,
            endHour,
            isLeave,
            isSickLeave,
            dateString,
          }))
        }
        dispatch(actionCreators.setOutOfDateHolidays(true));
        return result;
      })
  }
}

export const fetchYears = () => {
  return (dispatch) => {
    dispatch(actionCreators.startYearsLoading());
    return getYears()
      .then(result => {

        dispatch(actionCreators.setYears({ years: result.rows._array.sort((a, b) => a.year > b.year ) }));
        return result;
      })
      .catch((error) => {
        dispatch(actionCreators.setYearsError('Błąd! Nie udało się pobrać historii!'));
      });
  }
}

export const getInitialSettings = () => {
  return async dispatch => {
    const settings = await AsyncStorage.getItem('settings');
    if(settings !== null) {
      dispatch(actionCreators.setSettings(JSON.parse(settings)));
    }
    const holidays = await AsyncStorage.getItem('holidays');

    if(holidays !== null) {
      dispatch(actionCreators.setHolidays(JSON.parse(holidays)));
    }
  }
}

export const removeDay = (dayId) => {
  return async dispatch => {
    return deleteDay(dayId)
      .then(() => {
        dispatch(actionCreators.deleteDay(dayId));
        dispatch(actionCreators.setOutOfDateHolidays(true));
      })
  }
}