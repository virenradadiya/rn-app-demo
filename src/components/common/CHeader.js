import {StyleSheet, View} from 'react-native';
import React from 'react';
import {styles} from '../../themes';
import CText from './CText';

export default function CHeader(props) {
  const {title, rightIcon, isHideBack, isLeftIcon} = props;

  return (
    <View style={[localStyles.container, !!isHideBack && styles.pr10]}>
      <View style={[styles.rowStart, styles.flex]}>
        {!!isLeftIcon && isLeftIcon}

        <CText
          numberOfLines={1}
          style={[styles.pr10, styles.mr10]}
          type={'B22'}>
          {title}
        </CText>
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.center,
  },
});
