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
    case actions.ADD_YEAR: 
      let shouldUpdate = false;
      if(!statePart.years.find((yearItem) => yearItem.year === action.payload.year)) {
        shouldUpdate = true;
      }

      return {
        ...statePart,
        years: shouldUpdate ? [...statePart.years, action.payload].sort((a, b) => a.year > b.year) : statePart.years,
      }
    default: 
      return statePart;
  }
}

export default historyReducer;