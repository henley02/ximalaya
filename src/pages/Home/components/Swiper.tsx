import React from 'react';
import Carousel, {
  AdditionalParallaxProps,
  ParallaxImage,
  Pagination,
} from 'react-native-snap-carousel';
import {View, StyleSheet, ListRenderItemInfo} from 'react-native';

import {ICarousel} from '@/models/home';
import {hp, viewportWidth, wp} from '@/utils/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const sliderWidth = viewportWidth;
const slideWidth = wp(90);
export const slideHeight = hp(26);
const itemWidth = slideWidth + wp(2) * 2;

const mapStateToProps = ({home}: RootState) => ({
  data: home.carouselList,
  activeCarouselIndex: home.activeCarouselIndex,
});

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

class Swiper extends React.Component<IProps, any> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarouselList',
    });
  }

  _renderItem = (
    {item, index}: ListRenderItemInfo<ICarousel>,
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <View key={index}>
        <ParallaxImage
          source={{uri: item.image}}
          style={styles.image}
          containerStyle={styles.imageContainer}
          parallaxFactor={0.8}
          showSpinner
          spinnerColor="rgba(0,0,0,0.25)"
          {...parallaxProps}
        />
      </View>
    );
  };

  _onSnapToItem = (index: number) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/setState',
      payload: {
        activeCarouselIndex: index,
      },
    });
  };

  get pagination() {
    const {data, activeCarouselIndex: activeSlide} = this.props;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.6}
        />
      </View>
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View style={{marginTop: 4}}>
        <Carousel
          data={data}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth} // 轮播的宽度
          itemWidth={itemWidth} //  单个Item的宽度
          hasParallaxImages
          loop
          autoplay
          onSnapToItem={this._onSnapToItem}
        />
        {this.pagination}
      </View>
    );
  }
}

export default connector(Swiper);

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: slideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
});
