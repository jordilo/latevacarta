import * as jsonPackage from './../../package.json';
const domain = 'jordi-lopez.eu.auth0.com';
const hostname = window.location.hostname;
const protocol = window.location.protocol;
export const environment = {
  production: true,
  appName: 'La teva carta ',
  version: jsonPackage.version,
  auth: {
    clientID: 'WhSzGqyXoczFWt1GOXaTbV7kevavhfIh',
    domain,
    redirectUri: `${protocol}://${hostname}/callback`,
    returnTo: `${protocol}://${hostname}`,
    scope: 'openid profile email',
    audience: `https://${domain}/userinfo`,
    responseType: 'token id_token',
  }
};
