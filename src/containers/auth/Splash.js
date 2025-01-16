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

const Splash = ({navigation}) => {
  const asyncProcess = async () => {
    let isJailBroken = JailMonkey.isJailBroken();
    try {
      if (!!isJailBroken) {
        RNExitApp.exitApp();
      } else {
        navigation.replace(StackNav.SetUpProfile);
      }
    } catch (e) {
      console.log('error ', e);
    }
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
