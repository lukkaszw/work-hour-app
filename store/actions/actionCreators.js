import ACTIONS from './actions';

export const setDays = (days) => ({ payload: days, type: ACTIONS.SET_DAYS });
export const startDaysLoading = () => ({ type: ACTIONS.START_DAYS_LOADING });
export const setDaysError = () => ({ type: ACTIONS.SET_DAYS_ERROR });
export const resetDaysError = () => ({ type: ACTIONS.RESET_DAYS_ERROR });