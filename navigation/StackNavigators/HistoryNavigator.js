import { createStackNavigator } from 'react-navigation-stack';

import { headerOptions } from '../defaultOptions';

import HistoryScreen from '../../screens/HistoryScreen';

const HistoryNavigator = createStackNavigator({
  History: HistoryScreen,
}, {
  defaultNavigationOptions: headerOptions,
});

export default HistoryNavigator;