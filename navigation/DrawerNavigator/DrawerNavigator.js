import { createDrawerNavigator } from 'react-navigation-drawer';

import TabNavigator from '../TabNavigator/TabNavigator';
import SettingsNavigator from '../StackNavigators/SettingsNavigator';

const DrawerNavigator = createDrawerNavigator({
  App: TabNavigator,
  Settings: SettingsNavigator,
});

export default DrawerNavigator;