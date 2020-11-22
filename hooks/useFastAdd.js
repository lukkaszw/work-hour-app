import { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import { addDay } from '../store/api-requests/api-requests';

const useFastAdd = ({ initialValues, currentMonth }) => {

  const dispatch = useDispatch();

  const compExists = useRef(true);
  const [isSendingFast, setIsSendingFast] = useState(false);

  const initialsNotExists = !initialValues.startHour || !initialValues.endHour || !initialValues.dateString;

  const handleFastAdd = useCallback(() => {
    if(initialsNotExists) {
      return;
    }

    const data = { 
      startHour: initialValues.startHour, 
      endHour: initialValues.endHour, 
      dateString: initialValues.dateString,
      currentMonth,
    };

    setIsSendingFast(true);

    dispatch(addDay(data))
      .then(() => {
        if(compExists) {
          setIsSendingFast(false);
        }
      })
      .catch((error) => {
        setIsSendingFast(false);
        Alert.alert(
          'Błąd!',
          'Nie udało się dodać godzin w sposób błyskawiczny. Spróbuj tradycyjnie!',
        );
      });


  }, [initialValues, initialsNotExists, compExists, setIsSendingFast]);


  return {
    areInitialExists: !initialsNotExists,
    isSendingFast,
    handleFastAdd,
  }
}

export default useFastAdd;