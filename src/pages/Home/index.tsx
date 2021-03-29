import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

const mapStateToProps = ({home}: RootState) => ({
  num: home.num,
});

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class HomeScreen extends React.Component<IProps, any> {
  handleClick = () => {
    const {dispatch} = this.props;
    console.log(1);
    dispatch({
      type: 'home/add',
      payload: {
        num: 1,
      },
    });
  };
  asyncHandleClick = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/asyncAdd',
      payload: {
        num: 2,
      },
    });
  };

  render() {
    const {navigation, num} = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home</Text>
        <Text>{num}</Text>
        <Button title={'add'} onPress={this.handleClick} />
        <Button title={'asyncAdd'} onPress={this.asyncHandleClick} />
        <Button
          title={'Go to Detail'}
          onPress={() => navigation.navigate('Detail', {id: 1212})}
        />
      </View>
    );
  }
}

export default connector(HomeScreen);
