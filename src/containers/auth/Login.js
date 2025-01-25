import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

// Local imports
import {colors, styles} from '../../themes';
import {validateEmail, validatePassword} from '../../utils/validators';
import CInput from '../../components/common/CInput';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {getHeight, moderateScale} from '../../common/constants';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import CHeader from '../../components/common/CHeader';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import {keys, setEncryptedStorageData} from '../../utils/helpers';
import {StackNav} from '../../navigation/NavigationKeys';
import CText from '../../components/common/CText';

export default function Login({navigation}) {
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const [email, setEmail] = useState('');
  const [emailInputStyle, setEmailInputStyle] = useState(BlurredStyle);
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInputStyle, setPasswordInputStyle] = useState(BlurredStyle);
  const [errorPassword, setErrorPassword] = useState('');

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const onFocusEmail = () => onFocusInput(setEmailInputStyle);
  const onBlurEmail = () => onBlurInput(setEmailInputStyle);
  const onFocusPassword = () => onFocusInput(setPasswordInputStyle);
  const onBlurPassword = () => onBlurInput(setPasswordInputStyle);
  const onPressRegister = () => navigation.navigate(StackNav.SetUpProfile);

  const getDeviceToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      return token;
    }
  };

  const loginUser = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const userId = userCredential.user.uid;

      //   // Get current device token
      const currentToken = await getDeviceToken();
      console.log('current', currentToken);

      // Check if the token is already stored
      const userDoc = await firestore().collection('users').doc(userId).get();

      if (!userDoc.exists) {
        // If user document does not exist, create it and store the token
        await firestore().collection('users').doc(userId).set({
          deviceToken: currentToken,
          email: email,
          password: password,
        });
        console.log('Device token stored for the first time.');
        await setEncryptedStorageData(keys.LOGIN, 'true');
        navigation.navigate(StackNav.Home);
      } else {
        const storedToken = userDoc.data().deviceToken;

        if (storedToken !== currentToken) {
          Alert.alert('Error', 'Login from another device');
        } else {
          await setEncryptedStorageData(keys.LOGIN, 'true');
          navigation.navigate(StackNav.Home);
          console.log('Login successful from the recognized device.');
        }
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const onChangedEmail = text => {
    const {msg} = validateEmail(text);
    setEmail(text);
    setErrorEmail(msg);
  };

  const onChangedPassword = text => {
    const {msg} = validatePassword(text);
    setPassword(text);
    setErrorPassword(msg);
  };

  const onPressLogin = () => {};

  return (
    <CSafeAreaView>
      <CHeader title={'Login'} isHideBack={true} />
      <KeyBoardAvoidWrapper containerStyle={styles.p20}>
        <CInput
          placeHolder={strings.email}
          keyBoardType={'email-address'}
          _value={email}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedEmail}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            emailInputStyle,
          ]}
          _onFocus={onFocusEmail}
          _onBlur={onBlurEmail}
          _errorText={errorEmail}
        />
        <CInput
          placeHolder={strings.password}
          _value={password}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedPassword}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            passwordInputStyle,
          ]}
          _onFocus={onFocusPassword}
          _onBlur={onBlurPassword}
          _errorText={errorPassword}
        />
      </KeyBoardAvoidWrapper>
      <CButton
        type={'S16'}
        title={strings.continue}
        onPress={loginUser}
        containerStyle={localStyles.continueBtnStyle}
      />
      <TouchableOpacity
        style={localStyles.bottomContainer}
        onPress={onPressRegister}>
        <CText type={'r14'} color={colors.placeHolderColor}>
          {strings.haveNotAnyAccount}
        </CText>
        <CText type={'s14'}>{strings.register}</CText>
      </TouchableOpacity>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  continueBtnStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
  bottomContainer: {
    ...styles.rowCenter,
    ...styles.mv15,
  },
});
