import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import {RootStackNavigation, RootStackParamList} from '@/navigator/index';

import IconFont from '@/assets/iconfont/index';
import ListenScreen from '@/pages/Listen/index';
import FoundScreen from '@/pages/Found';
import AccountScreen from '@/pages/Account';
import HomeTabs from '@/navigator/HomeTabs';

export type BottomTabParamsList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamsList>();

type Route = RouteProp<RootStackParamList, 'BottomTabs'>;

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

function getHeaderTitle(routeName: string): string {
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '我的';
    default:
      return '首页';
  }
}

function BottomTabs({navigation, route}: IProps) {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTabs';
    let title = getHeaderTitle(routeName);
    navigation.setOptions({
      headerTitle: routeName === 'HomeTabs' ? '' : title,
      headerTransparent: routeName === 'HomeTabs',
    });
  }, [route, navigation]);

  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: '#f86442'}}>
      <Tab.Screen
        name={'HomeTabs'}
        component={HomeTabs}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <IconFont name={'icon-shouye'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Listen'}
        component={ListenScreen}
        options={{
          tabBarLabel: '我听',
          tabBarIcon: ({color, size}) => (
            <IconFont name={'icon-shoucang'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Found'}
        component={FoundScreen}
        options={{
          tabBarLabel: '发现',
          tabBarIcon: ({color, size}) => (
            <IconFont name={'icon-faxian'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Account'}
        component={AccountScreen}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <IconFont name={'icon-user'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
