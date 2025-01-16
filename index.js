/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src';
import {useFreeRasp} from 'freerasp-react-native';
import RNExitApp from 'react-native-exit-app';

const config = {
  androidConfig: {
    packageName: 'com.rndemo',
    certificateHashes: ['CERTIFICATE_HASH'],
  },
  iosConfig: {
    appBundleId: 'org.reactjs.native.example.RnDemo',
    appTeamId: 'TEAM_ID',
  },
  watcherMail: 'example@gmail.com',
  isProd: true,
};

const actions = {
  privilegedAccess: () => RNExitApp.exitApp(),
  debug: () => RNExitApp.exitApp(),
  simulator: () => RNExitApp.exitApp(),
  appIntegrity: () => RNExitApp.exitApp(),
  unofficialStore: () => RNExitApp.exitApp(),
  hooks: () => RNExitApp.exitApp(),
  deviceBinding: () => RNExitApp.exitApp(),
  secureHardwareNotAvailable: () => RNExitApp.exitApp(),
  passcode: () => RNExitApp.exitApp(),
  deviceID: () => RNExitApp.exitApp(),
  obfuscationIssues: () => RNExitApp.exitApp(),
};

const RNRoot = () => {
  // Call the useFreeRasp hook directly in the component body
  useFreeRasp(config, actions);

  return <App />;
};

AppRegistry.registerComponent(appName, () => RNRoot);
