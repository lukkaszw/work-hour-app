import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import InputField from '../components/InputField';
import { APP_HEIGHT } from '../constants/sizes';

const HourSettings = ({ 
  headerText,
  fromValue,
  onFromChangeHandler,
  fromError,
  toValue,
  onToChangeHandler,
  toError,
  addInfo,
}) => {
  return ( 
    <View style={styles.container}>
      { 
        headerText &&
          <Text style={styles.topText}>
            {headerText}
          </Text>
      }
      <View style={styles.hoursContainer}>
        <View style={styles.row}>
          <Text style={styles.hourLabel}>
            od:
          </Text>
          <InputField 
            value={fromValue}
            onChangeText={onFromChangeHandler}
            inputStyles={styles.additionalInputStyles}
            keyboardType="number-pad"
            error={fromError}
          />
        </View>
        <View style={styles.row}>
          <Text  style={styles.hourLabel}>
            do:
          </Text>
          <InputField 
            value={toValue}
            onChangeText={onToChangeHandler}
            inputStyles={styles.additionalInputStyles}
            keyboardType="number-pad"
            error={toError}
          />
        </View>
      </View>
      {
        addInfo &&
          <Text style={styles.formatInfo}>
            Proszę podać format: '01:22', '00:22', '23:33'...
          </Text>
      }
    </View>
  );
}

HourSettings.propTypes = {
  headerText: PropTypes.string,
  fromValue: PropTypes.string,
  fromError: PropTypes.bool,
  onFromChangeHandler: PropTypes.func.isRequired,
  toValue: PropTypes.string,
  onToChangeHandler: PropTypes.func.isRequired,
  toError: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },  
  topText: {
    fontSize: APP_HEIGHT < 600 ? 16 : 18,
    marginBottom: 20,
    textAlign: 'center',
  },  
  hoursContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formatInfo: {
    fontSize: 12,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourLabel: {
    fontSize: APP_HEIGHT < 600 ? 16 : 18,
    marginRight: 12,
  },
  additionalInputStyles: {
    width: 60,
    textAlign: 'center',
    fontSize: APP_HEIGHT < 600 ? 16 : 18,
  },
});
 
export default HourSettings;