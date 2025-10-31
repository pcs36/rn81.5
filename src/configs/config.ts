import Config from 'react-native-config';

interface AppConfig {
  API_KEY: string;
  BASE_URL: string;
  API_URL: string;
  API_VERSION: string;
  ENVIRONMENT: string;
}

// Provide defaults to prevent "possibly undefined" errors
export const AppConfig: AppConfig = {
  API_KEY: Config.API_KEY ?? '',
  BASE_URL: Config.BASE_URL ?? '',
  API_URL: Config.API_URL ?? '',
  API_VERSION: Config.API_VERSION ?? '',
  ENVIRONMENT: Config.ENVIRONMENT ?? 'development',
};