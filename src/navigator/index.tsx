import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import DetailScreen from '@/pages/Detail/index';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import BottomTabs from '@/navigator/BottomTabs';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Detail: {
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

class Navigator extends React.Component<any, any> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerBackTitleVisible: false,
            headerStatusBarHeight: StatusBar.currentHeight,
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}
          headerMode="float">
          <Stack.Screen
            name={'BottomTabs'}
            component={BottomTabs}
            options={{headerTitleAlign: 'center'}}
          />
          <Stack.Screen name={'Detail'} component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigator;
