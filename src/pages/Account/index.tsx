import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}

export default class AccountScreen extends React.Component<IProps, any> {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>Account</Text>
        <Button
          title={'Go to Detail'}
          onPress={() => navigation.navigate('Detail', {id: 1111})}
        />
      </View>
    );
  }
}
