import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal, ScrollView, View, Text, Button } from 'react-native';

import { getMonths } from '../db/db';
 
const MonthsModal = ({ year, onClose }) => {

  const [isLoading, setIsLoading] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    if(year) {
      setIsLoading(true);
      getMonths(year)
        .then((result) => {
          setMonths(result.rows._array.sort((a, b) => a.month > b.month));
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    }
  }, [year]);



  return ( 
    <Modal
      animationType="slide"
      visible={!!year}
    >
      <ScrollView>
        <View> 
          {
            months.map(month => (
              <Text key={month.month}>
                {month.month}
              </Text>
            ))
          } 

        </View>
        <Button 
          title="Cofnij"
          color="red"
          onPress={onClose}
        />
      </ScrollView>
    </Modal>
  );
}

MonthsModal.propTypes = {
  year: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
 
export default MonthsModal;