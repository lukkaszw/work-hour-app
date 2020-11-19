import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal, ScrollView, StyleSheet, View, Button } from 'react-native';
import MonthLinkItem from './MonthLinkItem';
import InlineButton from './InlineButton';
import Loader from '../components/Loader';

import { getMonths } from '../db/db';
import MONTHS from '../constants/months';
 
const MonthsModal = ({ year, onClose, navigation }) => {

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
        {
          isLoading ?
          <Loader />
          :
          <>
            <View> 
              {
                months.map(monthItem => (
                  <MonthLinkItem 
                    key={monthItem.month}
                    monthName={MONTHS[monthItem.month]}
                    monthNr={monthItem.month}
                    year={year}
                    navigation={navigation}
                    onClose={onClose}
                  />
                ))
              } 
            </View>
            <View style={styles.btnWrapper}>
              <InlineButton 
                title="Cofnij"
                color="red"
                onPress={onClose}
              /> 
            </View>
          </>
        }
      </ScrollView>
    </Modal>
  );
}

MonthsModal.propTypes = {
  year: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  btnWrapper: {
    marginTop: 30,
    alignItems: 'center',
  }
});
 
export default MonthsModal;