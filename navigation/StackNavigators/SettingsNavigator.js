import { createStackNavigator } from 'react-navigation-stack';

import { headerOptions } from '../defaultOptions';

import SettingsScreen from '../../screens/SettingsScreen';

const SettingNavigator = createStackNavigator({
  Settings: SettingsScreen,
}, {
  defaultNavigationOptions: headerOptions,
});

export default SettingNavigator;