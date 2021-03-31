import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IChannel} from '@/models/home';
import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';

interface IProps {
  data: IChannel;
  onPress: (data: IChannel) => void;
}

export default class Channel extends PureComponent<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  _handleClick = () => {
    const {data, onPress} = this.props;
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };

  render() {
    const {data} = this.props;
    return (
      <Touchable onPress={this._handleClick}>
        <View style={styles.item}>
          <Image
            source={{uri: data.image}}
            style={styles.image}
            fadeDuration={0}
            resizeMethod={'resize'}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {data.title}
            </Text>
            <Text style={styles.remark} numberOfLines={2}>
              {data.remark}
            </Text>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomLeft}>
                <IconFont name={'icon-V'} size={14} />
                <Text style={styles.number}>{data.played}</Text>
              </View>
              <View style={styles.bottomRight}>
                <IconFont name={'icon-shengyin'} size={14} />
                <Text style={styles.number}>{data.playing}</Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#dedede',
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  remark: {
    backgroundColor: '#f8f8f8',
    padding: 5,
    marginBottom: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    marginLeft: 5,
  },
});
