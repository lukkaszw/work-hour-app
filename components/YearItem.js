import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const YearItem = ({
  year, onShowMonths,
}) => {
  return ( 
    <TouchableOpacity onPress={() => onShowMonths(year)}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {year}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

YearItem.propTypes = {
  year: PropTypes.number.isRequired,
  onShowMonths: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
  }
});
 
export default YearItem;