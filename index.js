/**
 * @format
 */
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store, { RootState, AppDispatch } from './src/store/store';
import FlashMessage from 'react-native-flash-message';

const ReduxApp = () => (
  <Provider store={store}>
    <App />
    <FlashMessage position="top" />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
