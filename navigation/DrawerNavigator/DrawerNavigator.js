import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

import TabNavigator from '../TabNavigator/TabNavigator';
import SettingsNavigator from '../StackNavigators/SettingsNavigator';

const DrawerNavigator = createDrawerNavigator({
  App: { 
    screen: TabNavigator, 
    navigationOptions: {
      drawerLabel: 'Aplikacja',
      drawerIcon: ({ tintColor }) => (
        <Ionicons 
          name='md-create'
          size={23}
          color={tintColor}
        />
      )
    }
  },
  Settings: { 
    screen: SettingsNavigator,
    navigationOptions: {
      drawerLabel: 'Ustawienia',
      drawerIcon: ({ tintColor }) => (
        <Ionicons 
          name='ios-settings'
          color={tintColor}
          size={23}
        />
      )
    }
  }
}, {
  contentOptions: {
    activeBackgroundColor: Colors.primary,
    activeTintColor: 'white',
  }
});

export default DrawerNavigator;