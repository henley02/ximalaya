import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import HomeScreen from '@/pages/Home';
import TopTabBarWrapper from '@/pages/Home/TopTabBarWrapper';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const renderTabBar = (props: MaterialTopTabBarProps) => {
  return <TopTabBarWrapper {...props} />;
};

function HomeTabs() {
  return (
    <Tab.Navigator
      lazy
      tabBar={renderTabBar}
      sceneContainerStyle={styles.sceneContainerStyle}
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: 80,
        },
        indicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: '#f86442',
        },
        activeTintColor: '#f86442',
        inactiveTintColor: '#333333',
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{tabBarLabel: '推荐¥'}}
      />
      <Tab.Screen
        name={'Home1rr'}
        component={HomeScreen}
        options={{tabBarLabel: '推荐'}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
});
export default HomeTabs;
