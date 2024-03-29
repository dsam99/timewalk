import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/Profile';
import SettingsScreen from '../screens/SettingsScreen';

export default HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const ProfileStack = createStackNavigator({
  Links: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

// export default createBottomTabNavigator({
//   HomeStack,
//   // ProfileStack,
// });
