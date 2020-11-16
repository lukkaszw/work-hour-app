import ACTIONS from './actions';

export const setDays = ({days, month}) => ({ payload: { days, month }, type: ACTIONS.SET_DAYS });
export const startDaysLoading = () => ({ type: ACTIONS.START_DAYS_LOADING });
export const setDaysError = () => ({ type: ACTIONS.SET_DAYS_ERROR });
export const resetDaysError = () => ({ type: ACTIONS.RESET_DAYS_ERROR });
export const addDay = (dayData) => ({ payload: dayData, type: ACTIONS.ADD_DAY});
export const editDay = (dayData) => ({ payload: dayData, type: ACTIONS.EDIT_DAY });

export const startYearsLoading = () => ({ type: ACTIONS.START_YEARS_LOADING });
export const setYears = ({ years }) => ({ payload: years, type: ACTIONS.SET_YEARS });
export const setYearsError = () => ({ type: ACTIONS.SET_YEARS_ERROR });
export const resetYearsError = () => ({ type: ACTIONS.RESET_DAYS_ERROR });