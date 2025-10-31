import React from 'react';
import {ActivityIndicator} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {wp} from '../../utils/responsive.util';

/**
 * Displays a success message using react-native-flash-message.
 *
 * @param {string} title - The title of the success message.
 * @param {string} [desc] - The description of the success message.
 * @param {number} [duration=1850] - The duration in milliseconds for which the success message will be displayed.
 * @param {Function} [onPress=() => {}] - Callback function to be executed when the success message is pressed.
 *
 * @example
 * / Example usage of successMessage
 * successMessage('Success', 'Operation completed successfully');
 */
export function successMessage(
  title: string,
  desc?: string,
  duration: number = 4850,
  onPress: () => void = () => {},
): void {
  showMessage({
    message: Capitalize(title),
    description: desc,
    style: {
      paddingVertical: 3,
      paddingHorizontal: 20,
    },
    onPress,
    duration,
    type: 'success',
  });
}

/**
 * Displays a loading message using react-native-flash-message.
 *
 * @param {string} title - The title of the loading message.
 * @param {string} [desc] - The description of the loading message.
 * @param {Function} [onPress=() => {}] - Callback function to be executed when the loading message is pressed.
 *
 * @example
 * / Example usage of loadingMessage
 * loadingMessage('Loading', 'Please wait...');
 */
export function loadingMessage(
  title: string,
  desc?: string,
  duration: number = 4850,
  onPress: () => void = () => {},
): void {
  showMessage({
    message: Capitalize(title),
    description: desc,
    autoHide: false,
    onPress,
    type: 'info',
    hideOnPress: false,
    duration,
    icon: props => (
      <ActivityIndicator size={'small'} color={'#ffffff'} {...props} />
    ),
    iconProps: {
      style: {
        marginRight: wp(2),
      },
    },
  });
}

/**
 * Displays an error message using react-native-flash-message.
 *
 * @param {string} title - The title of the error message.
 * @param {string} [desc] - The description of the error message.
 * @param {number} [duration=1850] - The duration in milliseconds for which the error message will be displayed.
 * @param {Function} [onPress=() => {}] - Callback function to be executed when the error message is pressed.
 *
 * @example
 * / Example usage of errorMessage
 * errorMessage('Error', 'An error occurred while processing your request');
 */
export function errorMessage(
  title: string,
  desc?: string,
  duration: number = 4850,
  onPress: () => void = () => {},
): void {
  console.log("@@@@@@@")
  showMessage({
    message: Capitalize(title),
    description: desc,
    onPress,
    duration,
    type: 'danger',
  });
}

function Capitalize(str:string) {
  return str.slice(0,1).toUpperCase() + str.slice(1, str.length).toLowerCase()
  }
/**
 * Displays an info message using react-native-flash-message.
 *
 * @param {string} title - The title of the info message.
 * @param {string} [desc] - The description of the info message.
 * @param {number} [duration=1850] - The duration in milliseconds for which the info message will be displayed.
 * @param {Function} [onPress=() => {}] - Callback function to be executed when the info message is pressed.
 *
 * @example
 * / Example usage of infoMessage
 * infoMessage('Info', 'This is an informative message');
 */
export function infoMessage(
  title: string,
  desc?: string,
  duration: number = 4850,
  onPress: () => void = () => {},
): void {
  showMessage({
    message: Capitalize(title),
    description: desc,
    style: {
      paddingVertical: 3,
      paddingHorizontal: 20,
    },
    onPress,
    duration,
    type: 'info',
  });
}

/**
 * Hides the currently displayed flash message.
 *
 * @function
 *
 * @example
 * / Example usage of hideMessage
 * hideMessage();
 */
export {hideMessage};
