import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Swiper from '@/pages/Home/components/Swiper';
import Guess from '@/pages/Home/components/Guess';
import Channel from '@/pages/Home/components/Channel';
import {IChannel} from '@/models/home';
import {slideHeight} from '@/pages/Home/components/Swiper';

interface IState {
  refreshing: boolean;
}

const mapStateToProps = ({home, loading}: RootState) => ({
  channelList: home.channelList,
  loading: loading.effects['home/fetchChannelList'],
  hasMore: home.pagination.hasMore,
  gradientVisible: home.gradientVisible,
});

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class HomeScreen extends React.Component<IProps, IState> {
  state = {
    refreshing: false,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannelList',
    });
  }

  _onPress = (data: IChannel) => {
    console.log(data);
  };

  _renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <Channel data={item} onPress={this._onPress} />;
  };

  _keyExtractor = (item: IChannel) => {
    return item.id;
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannelList',
      callback: () => {
        this.setState({
          refreshing: false,
        });
      },
    });
  };

  /**
   * 加载更多
   */
  _onEndReached = () => {
    const {dispatch, loading, hasMore} = this.props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: 'home/fetchChannelList',
      payload: {
        loadMore: true,
      },
    });
  };

  _onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(nativeEvent);
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < slideHeight;
    const {dispatch, gradientVisible} = this.props;

    if (newGradientVisible !== gradientVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  get header() {
    return (
      <>
        <Swiper />
        <View style={styles.guessWrapper}>
          <Guess />
        </View>
      </>
    );
  }

  get footer() {
    const {hasMore, loading, channelList} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.footer}>
          <Text>--我是有底线的--</Text>
        </View>
      );
    }
    if (loading && hasMore && channelList.length > 0) {
      return (
        <View style={styles.footer}>
          <Text>正在加载中...</Text>
        </View>
      );
    }
  }

  get empty() {
    const {loading} = this.props;
    if (loading) {
      return;
    }
    return (
      <View style={styles.emptyContainer}>
        <Text>暂无数据</Text>
      </View>
    );
  }

  render() {
    const {channelList} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        data={channelList}
        renderItem={this._renderItem}
        ListHeaderComponent={this.header}
        ListEmptyComponent={this.empty}
        keyExtractor={this._keyExtractor}
        onRefresh={this._onRefresh}
        refreshing={refreshing}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.2}
        onScroll={this._onScroll}
        ListFooterComponent={this.footer}
      />
    );
  }
}

export default connector(HomeScreen);

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  guessWrapper: {
    backgroundColor: '#fff',
  },
});
