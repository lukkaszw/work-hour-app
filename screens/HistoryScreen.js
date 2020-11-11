import React from 'react';
import { View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';

const HistoryScreen = () => {
  return ( 
    <View>
      <Text>
        History screen
      </Text>
    </View>
  );
}

HistoryScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Historia',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.openDrawer('AddDay');
            }}
          />
        </HeaderButtons>
      )
    }
  }
}
 
export default HistoryScreen;