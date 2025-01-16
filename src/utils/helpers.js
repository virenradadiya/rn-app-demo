import EncryptedStorage from 'react-native-encrypted-storage';

export const keys = {
  LOGIN: 'login',
  BIMATRIC: 'biometric',
};

const setEncryptedStorageData = async (key, val) => {
  await EncryptedStorage.setItem(key, JSON.stringify(val));
  return;
};

const getEncryptedStorageData = async key => {
  const data = await EncryptedStorage.getItem(key);
  return data;
};

const clearEncryptedStorageData = async key => {
  await EncryptedStorage.removeItem(key);
};

const clearStorage = async () => {
  await EncryptedStorage.clear();
};

export {
  setEncryptedStorageData,
  getEncryptedStorageData,
  clearEncryptedStorageData,
  clearStorage,
};
