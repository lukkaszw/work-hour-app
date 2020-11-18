import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MonthLinkItem = ({
  monthName,
  monthNr,
  year,
  navigation,
  onClose,
}) => {

  const onGoToMonthScreen = useCallback(() => {
    onClose();
    navigation.navigate('Month', {
      month: monthNr,
      year,
    });
  }, [monthNr, year]);

  return ( 
    <TouchableOpacity onPress={onGoToMonthScreen}>
      <Text const style={styles.link}>
        {monthName}
      </Text>
    </TouchableOpacity>
  );
}

MonthLinkItem.propTypes = {
  monthName: PropTypes.string.isRequired,
  monthNr: PropTypes.number.isRequired,
  year: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  link: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  }
});
 
export default MonthLinkItem;