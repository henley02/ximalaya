import React from 'react';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({home}: RootState) => {
  return {
    linearColors:
      home.carouselList && home.carouselList.length > 0
        ? home.carouselList[home.activeCarouselIndex]
          ? home.carouselList[home.activeCarouselIndex].colors
          : undefined
        : undefined,
    gradientVisible: home.gradientVisible,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps, any> {
  get linearGradient() {
    const {linearColors = ['#ccc', '#e2e2e2'], gradientVisible} = this.props;
    return gradientVisible ? (
      <LinearAnimatedGradientTransition
        colors={linearColors}
        style={styles.linearGradient}
      />
    ) : null;
  }

  render() {
    let {gradientVisible, indicatorStyle, ...resetProps} = this.props;
    let textStyle = styles.text;
    let activeTintColor = '#333';
    // let indicatorStyle = {
    //   backgroundColor: '#333',
    // };
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(indicatorStyle, {
          backgroundColor: '#fff',
        });
      }
    }
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topBarView}>
          <MaterialTopTabBar
            {...resetProps}
            style={styles.tabBar}
            activeTintColor={activeTintColor}
            indicatorStyle={indicatorStyle}
          />
          <Touchable style={styles.categoryBtn}>
            <Text style={textStyle}>??????</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>??????</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>????????????</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default connector(TopTabBarWrapper);

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#fff',
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  topBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBar: {
    flex: 1,
    elevation: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
});
