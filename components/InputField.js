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

  const errorStyles = error ? styles.error : null;

  return ( 
    <View style={styles.field}>
      {
        label &&
          <Text style={styles.label}>
            {label}
          </Text>
      }
      <TextInput 
        style={{ ...styles.input, ...inputStyles, ...errorStyles }}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
}

InputField.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.bool,
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
    color: 'black',
  },
  error: {
    color: 'red',
    borderBottomColor: 'red',
  }
});
 
export default InputField;