import React from 'react';
import { View, Text, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';

const HistoryScreen = ({ navigation }) => {
  return ( 
    <View>
      <Button 
        title="Do grudnia"
        onPress={() => {
          navigation.navigate('Month', {
            month: 12,
            year: 2020,
          })
        }}
      />
            <Button 
        title="Do stycznia"
        onPress={() => {
          navigation.navigate('Month', {
            month: 1,
            year: 2021,
          })
        }}
      />
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