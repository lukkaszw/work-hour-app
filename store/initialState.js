const initialState = {
  days: {
    data: [],
    month: '',
    isLoading: false,
    error: false,
  },
  history: {
    years: [],
    isLoading: false,
    error: false,
  },
  settings: {
    startHour: '07:00',
    endHour: '15:00',
    workOnSaturday: false,
    startOnSaturday: '07:00',
    endOnSaturday: '15:00',
    workOnSunday: false,
    startOnSunday: '07:00',
    endOnSunday: '15:00',
  },
  holidays: {
    overdueHolidays: '0',
    currentHolidays: '20',
    outOfDate: false,
  },
};

export default initialState;