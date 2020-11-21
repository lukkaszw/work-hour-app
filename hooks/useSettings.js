import { useState, useCallback } from 'react';

import useHoursSettings from './useHoursSettings';

const useSettings = ({ initialValues }) => {

  const [workOnSaturday, setWorkOnSaturday] = useState(initialValues.workOnSaturday);
  const [workOnSunday, setWorkOnSunday] = useState(initialValues.workOnSunday);

  const toggleWorkOnSaturday = useCallback(() => {
    setWorkOnSaturday(prevValue => !prevValue);
  }, [setWorkOnSaturday]);

  const toggleWorkOnSunday = useCallback(() => {
    setWorkOnSunday(prevValue => !prevValue);
  }, [setWorkOnSunday]);

  const {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
  } = useHoursSettings({
    initialValues: {
      startHour: initialValues.startHour,
      endHour: initialValues.endHour,
    }
  });

  const {
    startHourField: startOnSaturdayField,
    endHourField: endOnSaturdayField,
    handleChangeEndHour: handleChangeSaturdayEnd,
    handleChangeStartHour: handleChangeSaturdayStart,
  } = useHoursSettings({
    initialValues: {
      startHour: initialValues.startOnSaturday,
      endHour: initialValues.endOnSaturday,
    }
  });

  const {
    startHourField: startOnSundayField,
    endHourField: endOnSundayField,
    handleChangeEndHour: handleChangeSundayEnd,
    handleChangeStartHour: handleChangeSundayStart,
  } = useHoursSettings({
    initialValues: {
      startHour: initialValues.startOnSunday,
      endHour: initialValues.endOnSunday,
    }
  });

  return {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    startOnSaturdayField,
    endOnSaturdayField,
    handleChangeSaturdayEnd,
    handleChangeSaturdayStart,
    startOnSundayField,
    endOnSundayField,
    handleChangeSundayEnd,
    handleChangeSundayStart,
    workOnSaturday,
    workOnSunday,
    toggleWorkOnSaturday,
    toggleWorkOnSunday,
  };
}

export default useSettings;