import { async } from '../../store';
import { user } from '../';
import {
  USER_AUTHORIZE,
  USER_LOGIN,
  USER_LOGOUT,
  USER_PASSWORD_RESET,
  USER_REGISTER,
  ACCOUNT_UPDATE,
  ADVERTISEMENT_CONTACT_DETAILS
} from './actions';

export default [
  ...async(USER_AUTHORIZE, user.authorize),
  ...async(USER_LOGIN, user.login),
  ...async(USER_LOGOUT, user.logout),
  ...async(USER_PASSWORD_RESET, user.resetPassword),
  ...async(USER_REGISTER, user.register),
  ...async(ACCOUNT_UPDATE, user.updateAccount),
  ...async(ADVERTISEMENT_CONTACT_DETAILS, user.addAdvertisementContact)
];
