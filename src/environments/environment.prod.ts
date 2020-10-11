import * as jsonPackage from './../../package.json';
const domain = 'jordi-lopez.eu.auth0.com';

export const environment = {
  production: true,
  appName: jsonPackage.name,
  version:  jsonPackage.version,
  auth: {
    clientID: 'WhSzGqyXoczFWt1GOXaTbV7kevavhfIh',
    domain,
    redirectUri: 'https://admin.latevacarta.click/callback',
    returnTo: 'https://admin.latevacarta.click',
    scope: 'openid profile email',
    audience: `https://${domain}/userinfo`,
    responseType: 'token',
  }
};
