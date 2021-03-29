import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation, RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';

interface IProps {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'Detail'>;
}

export default class DetailScreen extends React.Component<IProps, any> {
  render() {
    const {navigation, route} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Detail</Text>
        <Text>{route.params.id}</Text>
        <Button title={'Back'} onPress={() => navigation.goBack()} />
      </View>
    );
  }
}
