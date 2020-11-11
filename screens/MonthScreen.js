import React from 'react';
import { View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';

const MonthScreen = ({ navigation }) => {
  return ( 
    <View>
      <Text>
        Month screen
      </Text>
    </View>
  );
}

MonthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Mesiąc',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.openDrawer()
            }}
          />
        </HeaderButtons>
      )
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Dodaj'
            iconName='ios-add'
            onPress={() => {
              navData.navigation.navigate('AddDay');
            }}
          />
        </HeaderButtons>
      )
    }
  }
}
 
export default MonthScreen;