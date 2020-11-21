import { useState, useCallback } from 'react';
import changeHourInputText from '../utils/changeHourInputText';
import { validateHourFormat } from '../utils/validators';

const useHoursSettings = ({ initialValues }) => {
  
    //fields
    const [startHourField, setStartHourField] = useState({
      value: initialValues ? initialValues.startHour : '',
      error: false,
    });
  
    const [endHourField, setEndHourField] = useState({
      value: initialValues ? initialValues.endHour : '',
      error: false,
    });

   //handlers
   const handleChangeStartHour = useCallback((text) => {
    setStartHourField(prevObj => {
      const newValue = changeHourInputText(text, prevObj.value);
      
      return {
        value: newValue,
        error: !validateHourFormat(newValue),
      }
    });
  }, [setStartHourField]);

  const handleChangeEndHour = useCallback((text) => {
    setEndHourField(prevObj => {
      const newValue = changeHourInputText(text, prevObj.value);

      return {
        value: newValue,
        error: !validateHourFormat(newValue),
      }
    });
  }, [setEndHourField]);

  return {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    setStartHourField,
    setEndHourField,
  }
}

export default useHoursSettings;