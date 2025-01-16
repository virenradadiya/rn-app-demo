import {Dimensions} from 'react-native';

//Device dimensions
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export const deviceHeight = viewportHeight;

let sampleHeight = 926;

export const isTablet = viewportHeight / viewportWidth < 1.6;
const scale = viewportWidth / 375;

//Get Height of Screen
export function getHeight(value) {
  return (value / sampleHeight) * deviceHeight;
}

//Responsive size function
export function moderateScale(size) {
  const newSize = size * scale;
  if (isTablet) {
    return Math.round(newSize) - wp(1);
  } else {
    return Math.round(newSize);
  }
}
