import * as jsonPackage from './../../package.json';
const domain = 'jordi-lopez.eu.auth0.com';

export const environment = {
  production: true,
  appName: 'La teva carta ',
  graphQlUrl: 'https://latevacarta.herokuapp.com/v1/graphql',
  backendUrl: 'https://backend-tlc.herokuapp.com/',
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
