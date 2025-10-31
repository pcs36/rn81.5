import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, Image, ViewStyle, Dimensions } from 'react-native';

/**
 * Converts a width percentage value to its corresponding responsive pixel value.
 *
 * @function
 *
 * @param {number} percentage - The width percentage value to be converted.
 *
 * @returns {number} The responsive pixel value equivalent to the given width percentage.
 *
 * @example
 * / Example usage of wp
 * const widthInPixels = wp(50); // Converts 50% width to responsive pixels
 */
export {wp};

/**
 * Converts a height percentage value to its corresponding responsive pixel value.
 *
 * @function
 *
 * @param {number} percentage - The height percentage value to be converted.
 *
 * @returns {number} The responsive pixel value equivalent to the given height percentage.
 *
 * @example
 * / Example usage of hp
 * const heightInPixels = hp(50); // Converts 50% height to responsive pixels
 */
export {hp};

export const storeData = async (key:any, value:any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error("Error storing data", e);
  }
};

export const getData = async (key:any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.error("Error retrieving data", e);
  }
};

export const removeData = async (key:any) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Item removed successfully',key);
  } catch (e) {
    // removing error
    console.error("Error removing data", e);
    return false;
  }
};



/* export const getBase64ImageFromUrl = async (imageUrl: any) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
} */

export async function getBase64ImageFromUrl(url:any) {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}

// Function to convert file to Base64
export const fileConvertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getDimensions = () => {
  return Dimensions.get('window').width > 500
}
