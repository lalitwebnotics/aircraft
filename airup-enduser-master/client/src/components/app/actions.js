import { createAction } from 'redux-actions';

export const APP_CLICK = 'APP_CLICK';
export const DEVICE_CHANGE = 'DEVICE_CHANGE';
export const INITIALIZE = 'INITIALIZE';
export const MENU_MAIN_TOGGLE = 'MENU_MAIN_TOGGLE';
export const SIDEBAR_FILTERS_TOGGLE = 'SIDEBAR_FILTERS_TOGGLE';
export const SET_SIDEBAR_SEARCH = 'SET_SIDEBAR_SEARCH';
export const CERTIFICATE_REMOVE_FILTER = 'CERTIFICATE_REMOVE_FILTER';
export const CERTIFICATE_CLEAR_FILTER = 'CERTIFICATE_CLEAR_FILTER';

export const appClick = createAction(APP_CLICK);
export const deviceChange = createAction(DEVICE_CHANGE);
export const initialize = createAction(INITIALIZE);
export const menuMainToggle = createAction(MENU_MAIN_TOGGLE);
export const sidebarFiltersToggle = createAction(SIDEBAR_FILTERS_TOGGLE);
export const setSidebarSearch = createAction(SET_SIDEBAR_SEARCH);
export const removeCertificateFilter = createAction(CERTIFICATE_REMOVE_FILTER);
export const clearCertificateFilter = createAction(CERTIFICATE_CLEAR_FILTER);
