// Libraries import
import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

// Local import
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import CInput from '../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {StackNav} from '../../navigation/NavigationKeys';
import CButton from '../../components/common/CButton';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNum,
} from '../../utils/validators';
import {keys, setEncryptedStorageData} from '../../utils/helpers';
import CText from '../../components/common/CText';

const SetUpProfile = props => {
  const {navigation} = props;

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailInputStyle, setEmailInputStyle] = useState(BlurredStyle);
  const [fullNameInputStyle, setFullNameInputStyle] = useState(BlurredStyle);
  const [phoneNoInputStyle, setPhoneNoInputStyle] = useState(BlurredStyle);
  const [nicknameInputStyle, setNicknameInputStyle] = useState(BlurredStyle);
  const [isDisable, setIsDisable] = useState(true);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPhoneNo, setErrorPhoneNo] = useState('');
  const [errorNickname, setErrorNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInputStyle, setPasswordInputStyle] = useState(BlurredStyle);
  const [errorPassword, setErrorPassword] = useState('');

  useEffect(() => {
    if (!fullName || !nickname || !phoneNo || !email || !password) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [fullName, nickname, phoneNo, email, password]);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onFocusPassword = () => onFocusInput(setPasswordInputStyle);
  const onBlurPassword = () => onBlurInput(setPasswordInputStyle);

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
  };

  const onFocusFullName = () => onFocusInput(setFullNameInputStyle);
  const onFocusNickName = () => onFocusInput(setNicknameInputStyle);
  const onFocusPhoneNo = () => {
    onFocusInput(setPhoneNoInputStyle);
  };
  const onPressLogin = () => navigation.navigate(StackNav.Login);

  const onBlurFullName = () => onBlurInput(setFullNameInputStyle);
  const onBlurNickName = () => onBlurInput(setNicknameInputStyle);
  const onBlurPhoneNo = () => {
    onBlurInput(setPhoneNoInputStyle);
  };

  const onChangedFullName = text => {
    const {msg} = validateName(text);
    setFullName(text);
    setErrorFullName(msg);
  };

  const onChangedPassword = text => {
    const {msg} = validatePassword(text);
    setPassword(text);
    setErrorPassword(msg);
  };

  const onChangedNickName = text => {
    const {msg} = validateName(text);
    setNickname(text);
    setErrorNickname(msg);
  };

  const onChangedPhoneNo = text => {
    const {msg} = validatePhoneNum(text);
    setPhoneNo(text);
    setErrorPhoneNo(msg);
  };
  const onChangedEmail = text => {
    const {msg} = validateEmail(text);
    setEmail(text);
    setErrorEmail(msg);
  };

  const onPressContinue = async () => {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    if (userCredential.user.uid) {
      navigation.navigate(StackNav.Login);
    }
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.register} isHideBack={true} />
      <KeyBoardAvoidWrapper containerStyle={[styles.p20]}>
        <CInput
          placeHolder={strings.fullName}
          _value={fullName}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedFullName}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            fullNameInputStyle,
          ]}
          _onFocus={onFocusFullName}
          _onBlur={onBlurFullName}
          _errorText={errorFullName}
        />
        <CInput
          placeHolder={strings.nickname}
          _value={nickname}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedNickName}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            nicknameInputStyle,
          ]}
          _onFocus={onFocusNickName}
          _onBlur={onBlurNickName}
          _errorText={errorNickname}
        />
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
          placeHolder={strings.phoneNumber}
          keyBoardType={'number-pad'}
          _value={phoneNo}
          _maxLength={10}
          toGetTextFieldValue={onChangedPhoneNo}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            phoneNoInputStyle,
          ]}
          _onFocus={onFocusPhoneNo}
          _onBlur={onBlurPhoneNo}
          _errorText={errorPhoneNo}
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
        onPress={onPressContinue}
        disabled={!!isDisable}
        containerStyle={[
          localStyles.continueBtnStyle,
          isDisable && styles.disable,
        ]}
      />
      <TouchableOpacity
        style={localStyles.bottomContainer}
        onPress={onPressLogin}>
        <CText type={'r14'} color={colors.placeHolderColor}>
          {strings.alreadyHaveAnAccount}
        </CText>
        <CText type={'s14'}>{strings.logIn}</CText>
      </TouchableOpacity>
    </CSafeAreaView>
  );
};

export default SetUpProfile;

const localStyles = StyleSheet.create({
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  dropdownStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph25,
    ...styles.mt15,
  },
  btnContainer: {
    ...styles.p20,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  dobStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph25,
    ...styles.mt10,
    ...styles.mb5,
    ...styles.rowSpaceBetween,
  },
  continueBtnStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
  countryPickerButton: {
    ...styles.alignStart,
    ...styles.justifyCenter,
  },
  bottomContainer: {
    ...styles.rowCenter,
    ...styles.mv15,
  },
});
