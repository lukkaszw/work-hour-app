import * as actionCreators from '../actions/actionCreators';
import { getSpecificDays, insertDay, updateDayByDate } from '../../db/db';

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

export const addDay = ({ startHour, endHour, dateString, currentMonth }) => {

  return (dispatch) => {  
     return insertDay({ dateString, startHour, endHour })
      .then(result => {
        const resultMonthDate = getMonthFromDate(dateString);
        if(resultMonthDate === currentMonth) {
          dispatch(actionCreators.addDay({
            id: result.insertId,
            date: dateString,
            startHour,
            endHour,
          }));
        }
        return result;
      });
  }
}

export const editDayByDate = ({  startHour, endHour, dateString, currentMonth }) => {
  return (dispatch) => {
    return updateDayByDate({ startHour, endHour, dateString })
      .then(result => {
        const resultMonthDate = getMonthFromDate(dateString);
        if(resultMonthDate === currentMonth) {
          dispatch(actionCreators.editDay({
            startHour,
            endHour,
            dateString,
          }))
        }
        return result;
      })
  }
}