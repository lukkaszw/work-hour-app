import ACTIONS from './actions';

export const setDays = ({days, month}) => ({ payload: { days, month }, type: ACTIONS.SET_DAYS });
export const startDaysLoading = () => ({ type: ACTIONS.START_DAYS_LOADING });
export const setDaysError = () => ({ type: ACTIONS.SET_DAYS_ERROR });
export const resetDaysError = () => ({ type: ACTIONS.RESET_DAYS_ERROR });
export const addDay = (dayData) => ({ payload: dayData, type: ACTIONS.ADD_DAY});
export const editDay = (dayData) => ({ payload: dayData, type: ACTIONS.EDIT_DAY });