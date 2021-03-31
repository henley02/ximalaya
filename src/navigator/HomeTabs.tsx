import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import HomeScreen from '@/pages/Home';

function HomeTabs() {
  return (
    <Tab.Navigator
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
    </Tab.Navigator>
  );
}

export default HomeTabs;
