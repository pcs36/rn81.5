// utils/eventBus.ts
import { NativeEventEmitter } from 'react-native';

// Create and export a single shared instance
const eventBus = new NativeEventEmitter();

export default eventBus;