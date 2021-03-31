import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

/**
 * 根据百分比获取宽度
 * @param percentage
 */
function wp(percentage: number): number {
  const value = (viewportWidth * percentage) / 100;
  return Math.round(value);
}

/**
 * 根据百分比获取高度
 * @param percentage
 */
function hp(percentage: number): number {
  const value = (viewportHeight * percentage) / 100;
  return Math.round(value);
}

export {viewportWidth, viewportHeight, wp, hp};
