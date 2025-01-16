// Library Imports
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import JailMonkey from 'jail-monkey';
import RNExitApp from 'react-native-exit-app';

// Local Imports
import {styles} from '../../themes';
import {StackNav} from '../../navigation/NavigationKeys';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {getEncryptedStorageData, keys} from '../../utils/helpers';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const Splash = ({navigation}) => {
  const asyncProcess = async () => {
    // JailMonkey.isDebuggedMode().then(value => {
    //  RNExitApp.exitApp();
    // });

    let isJailBroken = JailMonkey.isJailBroken();
    try {
      if (!!isJailBroken) {
        RNExitApp.exitApp();
      } else {
        getBiomatricValue();
        // navigation.replace(StackNav.SetUpProfile);
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  const getBiomatricValue = async () => {
    let isBiomatric = await getEncryptedStorageData(keys.BIMATRIC);
    if (!!isBiomatric) {
      FingerprintScanner.isSensorAvailable()
        .then(biometryType => showAuthenticationDialog(biometryType))
        .catch(() => makeAsyncProcessing());
    } else {
      makeAsyncProcessing();
    }
  };

  const showAuthenticationDialog = biometryType => {
    if (biometryType !== null && biometryType !== undefined) {
      FingerprintScanner.authenticate({
        description:
          biometryType == 'Face ID'
            ? strings.faceIdToContinue
            : strings.touchIdToContinue,
      })
        .then(() => makeAsyncProcessing())
        .catch(error =>
          showPopupWithExit(error.message, () => RNExitApp.exitApp()),
        );
    } else {
      makeAsyncProcessing();
    }
  };

  const makeAsyncProcessing = () => {
    navigation.replace(StackNav.SetUpProfile);
  };

  useEffect(() => {
    asyncProcess();
  }, []);

  return (
    <CSafeAreaView style={localStyles.container}>
      <ActivityIndicator size="large" />
    </CSafeAreaView>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    ...styles.itemsCenter,
    ...styles.flex,
    ...styles.justifyCenter,
  },
});
