import {StatusBar} from 'react-native';
import React from 'react';
import AppNavigator from './navigation';
import {styles} from './themes';
import CSafeAreaView from './components/common/CSafeAreaView';

const App = () => {
  return (
    <CSafeAreaView style={styles.flex}>
      <StatusBar barStyle={'dark-content'} />
      <AppNavigator />
    </CSafeAreaView>
  );
};

export default App;
