// Library Imports
import {StyleSheet, View} from 'react-native';
import React from 'react';

// Local Imports
import {styles} from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import CText from '../../components/common/CText';
import CButton from '../../components/common/CButton';
import {StackNav} from '../../navigation/NavigationKeys';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const onPressLogout = () => {
    navigation.navigate(StackNav.SetUpProfile);
  };
  return (
    <CSafeAreaView style={localStyles.container}>
      <CHeader title={'Home'} isHideBack={true} />
      <View style={styles.flex}>
        <CText>{'This Is Home'}</CText>
      </View>
      <CButton
        type={'S16'}
        title={'Logout'}
        onPress={onPressLogout}
        containerStyle={localStyles.continueBtnStyle}
      />
    </CSafeAreaView>
  );
};

export default Home;

const localStyles = StyleSheet.create({
  container: {
    ...styles.flex,
  },
  continueBtnStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
});
