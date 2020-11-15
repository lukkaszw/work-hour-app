import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const InlineButton = ({ onPress, title, style }) => {
  return ( 
    <TouchableOpacity onPress={onPress}>
      <Text style={{...styles.inlineBtn, ...style }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

InlineButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  inlineBtn: {
    fontSize: 16,
    color: Colors.primary,
  },
});
 
export default InlineButton;