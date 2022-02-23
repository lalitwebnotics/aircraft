/**
 * Configuration
 */
export default {
  api: {
    debounce: {
      authorization: 1000
    },
    root: '//' + window.location.hostname + ':8001/api/v1/',
    token: 'aircraft-token'
  },
  breakpoints: {
    xs: 0,
    sm: 320,
    md: 768,
    lg: 992,
    xl: 1200
  },
  redux: {
    logger: false
  }
};
