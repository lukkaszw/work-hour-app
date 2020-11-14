import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

const InputField = ({ 
  value,
  onChangeText,
  label,
  error,
  inputStyles,
  ...props
}) => {
  return ( 
    <View style={styles.field}>
      {
        label &&
          <Text style={styles.label}>
            {label}
          </Text>
      }
      <TextInput 
        style={{ ...styles.input, ...inputStyles }}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
      {
        error && 
          <Text style={styles.error}>
            {error}
          </Text>
      }
    </View>
  );
}

InputField.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string,
};

const styles = StyleSheet.create({
  field: {
    justifyContent: 'center',
    alignItems: 'center',
  },  
  input: {
    padding: 5,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  error: {
    color: 'red',
  }
});
 
export default InputField;