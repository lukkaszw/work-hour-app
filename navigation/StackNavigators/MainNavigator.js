import { createStackNavigator } from 'react-navigation-stack';

import { headerOptions } from '../defaultOptions';

import MonthScreen from '../../screens/MonthScreen';
import AddDayScreen from '../../screens/AddDayScreen';

const MonthNavigator = createStackNavigator({
  Month: MonthScreen,
  AddDay: AddDayScreen,
}, {
  defaultNavigationOptions: headerOptions,
});

export default MonthNavigator;