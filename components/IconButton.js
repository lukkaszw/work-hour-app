import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const IconButton = ({ iconName, size, color, onPress }) => {
  return ( 
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Ionicons 
          name={iconName}
          size={size}
          color={color}
        />
      </View>
    </TouchableOpacity>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

IconButton.defaultProps = {
  size: 20,
  color: 'black',
}

const styles = StyleSheet.create({
  iconWrapper: {
    paddingHorizontal: 8,
  }
});
 

export default IconButton;