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
    default: 
      return statePart;
  }
}

export default daysReducer;