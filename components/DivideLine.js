import React from 'react';
import { StyleSheet, View } from 'react-native'; 

const DivideLine = () =>  <View style={styles.line}></View>;

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  }
});
 
export default DivideLine;