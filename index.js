/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src';

const RNRoot = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => RNRoot);
