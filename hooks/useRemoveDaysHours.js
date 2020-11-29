import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { removeDay } from '../store/api-requests/api-requests';

const useRemoveDaysHours = ({ dayId, closeOptions }) => {

  const dispatch = useDispatch();

  const compExists = useRef(true);

  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveDaysHours = useCallback(() => {
    if(dayId === null || dayId === undefined) {
      return;
    }

    setIsRemoving(true);

    dispatch(removeDay(dayId))
      .then(() => {
        if(compExists) {
          setIsRemoving(false);
          closeOptions();
        }
      })
      .catch(() => {
        if(compExists) {
          setIsRemoving(false);
        }
        Alert.alert(
          'Błąd!',
          'Nie udało się usunąć godzin pracy tego dnia! Prosimy spróbować ponownie!',
        );
      });

  }, [dayId, dispatch, setIsRemoving, closeOptions]);

  return {
    isRemoving,
    handleRemoveDaysHours,
  }
}

export default useRemoveDaysHours;