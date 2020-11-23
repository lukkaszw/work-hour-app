import { createStackNavigator } from 'react-navigation-stack';

import { headerOptions } from '../defaultOptions';

import HolidaysScreen from '../../screens/HolidaysScreen';

const HolidaysNavigator = createStackNavigator({
  Holidays: HolidaysScreen,
}, {
  defaultNavigationOptions: headerOptions,
});

export default HolidaysNavigator;