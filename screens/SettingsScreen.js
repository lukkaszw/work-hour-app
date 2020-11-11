import React from 'react';
import { View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';

const SettingsScreen = () => {
  return ( 
    <View>
      <Text>
        Settings screen
      </Text>
    </View>
  );
}

SettingsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Ustawienia',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.openDrawer();
            }}
          />
        </HeaderButtons>
      )
    }
  }
}
 
export default SettingsScreen;