import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DayItemText = ({ style, children }) => <Text style={{...styles.text, ...style}}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  }, 
});
 
export default DayItemText;