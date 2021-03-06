import React from 'react';
import Navigator from '@/navigator/index';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import {StatusBar} from 'react-native';
import '@/config/http';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        <StatusBar
          backgroundColor={'transparent'}
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
