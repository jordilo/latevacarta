import * as jsonPackage from './../../package.json';
const domain = 'jordi-lopez.eu.auth0.com';

export const environment = {
  production: false,
  graphQlUrl: 'https://latevacarta.herokuapp.com/v1/graphql',
  backendUrl: 'https://backend-tlc.herokuapp.com/',
  googleMapsApi: 'AIzaSyBFWvZ2Aoes_dRFk36ZQz65ip0TDutUTk4',
  files: {
    product_template: 'https://latevacarta.s3.eu-central-1.amazonaws.com/assets/products.xlsx',
  },
  appName: jsonPackage.name,
  version: 'dev.' + jsonPackage.version,
  auth: {
    clientID: 'WhSzGqyXoczFWt1GOXaTbV7kevavhfIh',
    domain,
    redirectUri: 'http://localhost:4200/callback',
    returnTo: 'http://localhost:4200',
    scope: 'openid profile email',
    audience: `https://${domain}/userinfo`,
    responseType: 'token id_token',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
