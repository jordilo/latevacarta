import { FactoryProvider, InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const BACKEND_URL = new InjectionToken('BACKEND_URL');

/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
export const BackendUrlProvider: FactoryProvider = {
  provide: BACKEND_URL,
  useFactory: () => environment.backendUrl,
};
