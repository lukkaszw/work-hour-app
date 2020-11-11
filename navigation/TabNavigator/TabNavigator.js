import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

import MainNavigator from '../StackNavigators/MainNavigator';
import HistoryNavigator from '../StackNavigators/HistoryNavigator';

const TabNavigator = createBottomTabNavigator({
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-home' size={25} color={tabInfo.tintColor}/>
      }
    },
  },
  History: {
    screen: HistoryNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-list-box' size={25} color={tabInfo.tintColor}/>
      }
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: Colors.primary,
  }
});

export default TabNavigator;