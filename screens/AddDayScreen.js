import React from 'react';
import { View, Text } from 'react-native';

const AddDayScreen = () => {
  return ( 
    <View>
      <Text>
        Add day screen
      </Text>
    </View>
  );
}

AddDayScreen.navigationOptions = {
  headerTitle: 'Dodaj godziny'
}
 
export default AddDayScreen;