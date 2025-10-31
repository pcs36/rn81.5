import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomError from '../../customClass/CustomError.class';
import {
  LOCAL_STORAGE_CLEAN_ERROR,
  LOCAL_STORAGE_READ_ERROR,
  LOCAL_STORAGE_WRITE_ERROR,
} from '../../constants/localStorageError.const';

async function setLocalStorage<T>(
  key: string,
  data: any | T,
): Promise<any | CustomError> {
  try {
    var parsedResult;
    if (typeof data === 'object') {
      parsedResult = JSON.stringify(data);
    } else {
      parsedResult = data;
    }
    await AsyncStorage.setItem(key, parsedResult);
  } catch (error: any) {
    throw new CustomError(LOCAL_STORAGE_WRITE_ERROR, error?.message);
  }
}
async function getLocalStorage<T>(key: string): Promise<T | String | Number | CustomError> {
  try {
    const result: T | String | Number | null = await AsyncStorage.getItem(key);
    if (result === null) {
      throw new CustomError(
        LOCAL_STORAGE_READ_ERROR,`Getting 'null' from ${key} `,);
    }
    return result;
  } catch (error: any) {
    throw new CustomError(LOCAL_STORAGE_READ_ERROR, error?.message);
  }
}
async function clearLocalStorage(key: string) {
  try {
    // return await AsyncStorage.clear();
    return await AsyncStorage.removeItem(key);
  } catch (error: any) {
    throw new CustomError(LOCAL_STORAGE_CLEAN_ERROR, error?.message);
  }
}
export {getLocalStorage, setLocalStorage, clearLocalStorage};
