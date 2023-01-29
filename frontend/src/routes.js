/* eslint-disable import/prefer-default-export */

export const routes = {
  loginPath: () => ['/api/v1', 'login'].join('/'),
  dataPath: () => ['/api/v1', 'data'].join('/'),
  signUpPath: () => ['/api/v1', 'signup'].join('/'),
  loginPage: () => ['/login'].join(),
  homePage: () => ['/'].join(),
  signUpPage: () => ['/signup'].join(),
};
