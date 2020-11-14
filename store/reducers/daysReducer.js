import { Provider } from 'react-redux';
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
        data: action.payload,
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
    default: 
      return statePart;
  }
}

export default daysReducer;