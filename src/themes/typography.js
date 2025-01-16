import {moderateScale} from '../common/constants';

// App Font Weights:
const fontWeights = {
  Regular: {
    fontWeight: '400', // Default weight for Regular
  },
  Medium: {
    fontWeight: '500', // Default weight for Medium
  },
  SemiBold: {
    fontWeight: '600', // Default weight for SemiBold
  },
  Bold: {
    fontWeight: '700', // Default weight for Bold
  },
};

// App font sizes:
const fontSizes = {
  f12: {
    fontSize: moderateScale(12),
  },
  f14: {
    fontSize: moderateScale(14),
  },
  f16: {
    fontSize: moderateScale(16),
  },
  f18: {
    fontSize: moderateScale(18),
  },
  f20: {
    fontSize: moderateScale(20),
  },
  f22: {
    fontSize: moderateScale(20),
  },
  f24: {
    fontSize: moderateScale(24),
  },
  f26: {
    fontSize: moderateScale(26),
  },
  f28: {
    fontSize: moderateScale(28),
  },
  f30: {
    fontSize: moderateScale(30),
  },
  f32: {
    fontSize: moderateScale(32),
  },
  f34: {
    fontSize: moderateScale(34),
  },
  f35: {
    fontSize: moderateScale(35),
  },
  f36: {
    fontSize: moderateScale(36),
  },
  f40: {
    fontSize: moderateScale(40),
  },
  f46: {
    fontSize: moderateScale(46),
  },
  f66: {
    fontSize: moderateScale(66),
  },
};

const typography = {fontWeights, fontSizes};

export default typography;
