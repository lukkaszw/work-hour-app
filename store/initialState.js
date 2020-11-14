const initialState = {
  days: {
    data: [],
    month: '',
    isLoading: false,
    error: false,
  },
  months: {
    data: [],
    isLoading: false,
    error: false,
  },
  settings: {
    startHour: '7:00',
    endHour: '15:00',
    workOnSaturday: false,
    startOnSaturday: '7:00',
    endOnSaturday: '15:00',
    workOnSunday: false,
    startOnSunday: '7:00',
    endOnSunday: '15:00',
  }
};

export default initialState;