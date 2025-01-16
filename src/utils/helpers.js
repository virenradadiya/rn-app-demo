import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptedStorageData = async (key, val) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(val));
    return;
  } catch (e) {
    Alert.alert('Error', e);
  }
};

const getEncryptedStorageData = async key => {
  try {
    const data = await EncryptedStorage.getItem(key);
    return data;
  } catch (e) {
    Alert.alert('Error', e);
  }
};

const clearEncryptedStorageData = async key => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e) {
    Alert.alert('Error', e);
  }
};

const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (e) {
    Alert.alert('Error', e);
  }
};

export {
  setEncryptedStorageData,
  getEncryptedStorageData,
  clearEncryptedStorageData,
  clearStorage,
};
