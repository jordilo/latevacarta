import * as jsonPackage from './../../package.json';
const domain = 'jordi-lopez.eu.auth0.com';

export const environment = {
  production: true,
  appName: 'La teva carta ',
  graphQlUrl: 'https://prod-latevacarta-database.herokuapp.com/v1/graphql',
  backendUrl: 'https://prod-backend-tlc.herokuapp.com/',
  googleMapsApi: 'AIzaSyBFWvZ2Aoes_dRFk36ZQz65ip0TDutUTk4',
  files: {
    product_template: 'https://latevacarta.s3.eu-central-1.amazonaws.com/assets/products.xlsx',
  },
  version: jsonPackage.version,
  auth: {
    clientID: 'WhSzGqyXoczFWt1GOXaTbV7kevavhfIh',
    domain,
    redirectUri: 'https://admin.latevacarta.click/callback',
    returnTo: 'https://admin.latevacarta.click',
    scope: 'openid profile email',
    audience: `https://${domain}/userinfo`,
    responseType: 'token id_token',
  },
};
