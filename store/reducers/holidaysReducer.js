import actions from '../actions/actions';

const holidaysReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.SET_HOLIDAYS:
      return {
        ...statePart,
        overdueHolidays: action.payload.overdueHolidays,
        currentHolidays: action.payload.currentHolidays,
      }
    case actions.SET_OVERDUE_HOLIDAYS:
      return {
        ...statePart,
        overdueHolidays: action.payload,
      }
    case actions.SET_CURRENT_HOLIDAYS:
      return {
        ...statePart,
        currentHolidays: action.payload,
      }
    case actions.SET_OUT_OF_DATE_HOLIDAYS:
      return {
        ...statePart,
        outOfDate: action.payload,
      }
    default: 
      return statePart;
  }
}

export default holidaysReducer;