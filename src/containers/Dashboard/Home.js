// Library Imports
import {StyleSheet, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Local Imports
import {styles} from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import CText from '../../components/common/CText';
import CButton from '../../components/common/CButton';
import {StackNav} from '../../navigation/NavigationKeys';
import {useNavigation} from '@react-navigation/native';
import {clearEncryptedStorageData, keys} from '../../utils/helpers';

const Home = () => {
  const navigation = useNavigation();

  const onPressLogout = async () => {
    try {
      const user = auth().currentUser;
      // Get the currently logged-in user
      if (user) {
        const userId = user.uid; // Get the user ID

        // Delete the user document from Firestore
        await firestore().collection('users').doc(userId).delete();
        console.log('User  data cleared from Firestore.');

        // Optionally, you can also sign out the user
        await auth().signOut();
        console.log('User  signed out successfully.');
      }

      // Clear any encrypted storage data
      await clearEncryptedStorageData(keys.LOGIN);
      navigation.navigate(StackNav.SetUpProfile);
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
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
