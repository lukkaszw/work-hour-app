import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import useHoursSettings from './useHoursSettings';
import { setSettings } from '../store/actions/actionCreators';

const useSettings = ({ initialValues, navigateToHomeScreen }) => {

  const dispatch = useDispatch();

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

  const handleSaveSettings = useCallback(() => {
    if(startHourField.error || endHourField.error) {
      return;
    }

    if(workOnSaturday) {
      if(startOnSaturdayField.error || endOnSaturdayField.error) {
        return;
      }
    }

    if(workOnSunday) {
      if(startOnSundayField.error || endOnSundayField.error) {
        return;
      }
    }

    const settings = {
      startHour: startHourField.value,
      endHour: endHourField.value,
      workOnSaturday,
      workOnSunday,
      startOnSaturday: startOnSaturdayField.value,
      endOnSaturday: endOnSaturdayField.value,
      startOnSunday: startOnSundayField.value,
      endOnSunday: endOnSaturdayField.value,
    };

    dispatch(setSettings(settings));

    Alert.alert('Ustawienia zapisano poprawnie!', 'Zapisano twoje nowe ustawienia aplikacji. Miłego korzystania!');

  }, [
      workOnSunday, workOnSaturday, 
      startHourField, endHourField,
      startOnSundayField, endOnSaturdayField, 
      startOnSaturdayField, endOnSundayField,
    ],
  );

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
    handleSaveSettings,
  };
}

export default useSettings;