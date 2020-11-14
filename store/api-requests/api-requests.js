import * as actionCreators from '../actions/actionCreators';
import { getSpecificDays, insertDay } from '../../db/db';

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
        const date = moment(dateString);
        const month = date.month() + 1;
        const monthStr = month > 9 ? month : `0${month}`;
        const resultMonthDate = `${monthStr}.${date.year()}`;
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