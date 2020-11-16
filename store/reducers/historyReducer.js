import actions from '../actions/actions';

const historyReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_YEARS_LOADING:
      return {
        ...statePart,
        isLoading: true,
      }
    case actions.SET_YEARS: 
      return {
        ...statePart,
        isLoading: false,
        years: action.payload,
      }
    case actions.SET_YEARS_ERROR:
      return {
        ...statePart,
        isLoading: false,
        error: action.payload,
      }
    case actions.RESET_YEARS_ERROR:
      return {
        ...statePart,
        error: false,
      }
    default: 
      return statePart;
  }
}

export default historyReducer;