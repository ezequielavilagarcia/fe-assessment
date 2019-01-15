import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  apiEndpoint: string;
  userDBKey: string;
}
export const APP_CONSTANTS: AppConfig = {
  apiEndpoint: 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json',
  userDBKey: 'user'
};
