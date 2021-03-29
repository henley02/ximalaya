import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import {RootStackNavigation, RootStackParamList} from '@/navigator/index';

import IndexScreen from '@/pages/Home/index';
import ListenScreen from '@/pages/Listen/index';
import FoundScreen from '@/pages/Found';
import AccountScreen from '@/pages/Account';

export type BottomTabParamsList = {
  Home: undefined;
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

function getHeaderTitle(route: Route): string {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
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

class BottomTabs extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    const {navigation, route} = this.props;
    let title = getHeaderTitle(route);
    navigation.setOptions({
      headerTitle: title,
    });
  }

  render() {
    return (
      <Tab.Navigator tabBarOptions={{activeTintColor: '#f86442'}}>
        <Tab.Screen name={'Home'} component={IndexScreen} />
        <Tab.Screen name={'Listen'} component={ListenScreen} />
        <Tab.Screen name={'Found'} component={FoundScreen} />
        <Tab.Screen name={'Account'} component={AccountScreen} />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
