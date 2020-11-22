import actions from '../actions/actions';

const daysReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_DAYS_LOADING: 
      return {
        ...statePart,
        data: [],
        isLoading: true,
      }
    case actions.SET_DAYS: 
      return {
        ...statePart,
        isLoading: false,
        data: action.payload.days,
        month: action.payload.month,
      }
    case actions.SET_DAYS_ERROR:
      return {
        ...statePart,
        isLoading: false,
        error: action.payload,
      }
    case actions.RESET_DAYS_ERROR:
        return {
          ...statePart,
          error: false,
        }
    case actions.ADD_DAY: 
        return {
          ...statePart,
          data: [...statePart.data, action.payload],
        }
    case actions.EDIT_DAY:
        return {
          ...statePart,
          data: statePart.data.map(day => {
            if(day.date === action.payload.dateString) {
              return {
                ...day,
                startHour: action.payload.startHour,
                endHour: action.payload.endHour,
              };
            }
            return day;
          }),
        }
    case actions.DELETE_DAY:
        return {
          ...statePart,
          data: statePart.data.filter(day => day.id !== action.payload),
        }
    default: 
      return statePart;
  }
}

export default daysReducer;