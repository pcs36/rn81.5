/* import {resetUserSlice} from '../redux/slice/user.slice';
import {store} from '../redux/store';
import {clearLocalStorage} from '../services/localStorage.service';
import {errorMessage, successMessage, loadingMessage} from '../services/toast.service';
import {LS_KEY_AUTH_TOKEN} from '../constants/storageKeys.const';

export async function autoLogout() {
  try {
    await clearLocalStorage(LS_KEY_AUTH_TOKEN);
    store.dispatch(resetUserSlice());
    errorMessage('Session Expired', 'Please login to continue');
  } catch (error) {
    errorMessage('Error', 'Please Restart the app');
    throw error;
  }
}
export async function manualLogout() {
  try {
    loadingMessage("Please wait", "Logging out user");
    await clearLocalStorage(LS_KEY_AUTH_TOKEN);
    store.dispatch(resetUserSlice());
    successMessage('Success', 'Log out successfully done.');
  } catch (error) {
    errorMessage('Error', 'Please Restart the app');
    throw error;
  }
}

export async function resetLogout() {
  try {
    await clearLocalStorage(LS_KEY_AUTH_TOKEN);
    store.dispatch(resetUserSlice());
  } catch (error) {
    errorMessage('Error', 'Please Restart the app');
    throw error;
  }
}
 */

import store from '../store/store';
import {resetUserSlice} from '../store/slice/user.slice';
import {errorMessage, successMessage, loadingMessage} from '../store/services/toast.service';
import eventBus from '../utils/eventBus';

export async function autoLogoutHandler () {
  try {

    // await clearLocalStorage(LS_KEY_AUTH_TOKEN);
    store.dispatch(resetUserSlice());
    eventBus.emit('userLogout');
    errorMessage('Session Expired', 'Please login to continue');
  } catch (error) {
    // errorMessage('Error', 'Please Restart the app');
    throw error;
  }
}