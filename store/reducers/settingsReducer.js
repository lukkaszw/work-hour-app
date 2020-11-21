import ACTIONS from '../actions/actions';

const settingsReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case ACTIONS.SET_SETTINGS: {
      return {
        ...statePart,
        startHour: action.payload.startHour,
        endHour: action.payload.endHour,
        workOnSaturday: action.payload.workOnSaturday,
        workOnSunday: action.payload.workOnSunday,
        startOnSaturday: action.payload.workOnSaturday ? action.payload.startOnSaturday : statePart.startOnSaturday,
        endOnSaturday: action.payload.workOnSaturday ? action.payload.endOnSaturday : statePart.endOnSaturday,
        startOnSunday: action.payload.workOnSunday ?  action.payload.startOnSunday : statePart.startOnSunday,
        endOnSunday: action.payload.workOnSunday ? action.payload.endOnSunday : statePart.endOnSunday,
      }
    }
    default: 
      return statePart;
  }
}

export default settingsReducer;