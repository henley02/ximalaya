import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';

const mapStateToProps = ({home}: RootState) => {
  return {
    guessList: home.guessList,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Guess extends React.Component<ModelState, any> {
  componentDidMount() {
    this.init();
  }

  init = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchGuessList',
    });
  };

  _handleClick = (item: IGuess) => {
    console.log(item);
  };

  _renderItem = ({item, index}: ListRenderItemInfo<IGuess>) => {
    return (
      <Touchable
        activeOpacity={1}
        key={index}
        style={styles.item}
        onPress={() => this._handleClick(item)}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  _keyExtractor = (item: IGuess) => {
    return item.id;
  };

  render() {
    const {guessList} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRight}>
            <IconFont name={'icon-xihuan'} />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.moreText}>更多</Text>
            <IconFont name={'icon-more'} />
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={guessList}
          renderItem={this._renderItem}
          numColumns={3}
          keyExtractor={this._keyExtractor}
        />
        <Touchable onPress={this.init} style={styles.refresh}>
          <IconFont name={'icon-huanyipi'} color={'red'} />
          <Text style={styles.refreshText}>换一批</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 5,
    color: '#333',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: '#6f6f6f',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 6,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  list: {
    padding: 10,
  },
  refresh: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  refreshText: {
    color: '#333',
    marginLeft: 5,
  },
});

export default connector(Guess);
