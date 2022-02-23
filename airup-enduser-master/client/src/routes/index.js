import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import trimEnd from 'lodash/trimEnd';
import trimStart from 'lodash/trimStart';
import React, { lazy } from 'react';
import { createBrowserHistory } from 'history';
import { Route, withRouter } from 'react-router-dom';

import { fromQuery } from '../utils';
import { watch } from '../store';
import Auth from './guards/Auth';

/**
 * Browser history
 */
export const history = createBrowserHistory();

/**
 * Route guards
 */
export const guards = {
  auth: Auth
};

/**
 * Logged in
 */
export const loggedInGuard = {
  name: 'auth',
  redirect: '/login',
  target: 'any'
};

/**
 * Not logged in
 */
export const notLoggedInGuard = {
  name: 'auth',
  redirect: '/hangar',
  target: 'none'
};

/**
 * All routes
 */
const routeList = [
  {
    path: '/',
    component: lazy(() => import('../components/home/Home')),
    title: 'Home'
  },
  {
    path: '/login',
    component: lazy(() => import('../components/login/Login')),
    guards: [notLoggedInGuard],
    exact: true,
    title: 'Login'
  },
  {
    path: '/register',
    component: lazy(() => import('../components/register/Register')),
    guards: [notLoggedInGuard],
    exact: true,
    title: 'Register'
  },
  {
    path: '/advertisement',
    component: lazy(() => import('../components/AdvertisementForm/AdvertisementForm')),
    exact: true,
    title: 'Place Advertisement'
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../components/forgot-password/ForgotPassword')),
    guards: [notLoggedInGuard],
    exact: true,
    title: 'Forgot Password'
  },
  {
    path: '/password-reset',
    component: lazy(() => import('../components/password-reset/PasswordReset')),
    guards: [notLoggedInGuard],
    exact: true,
    title: 'Password Reset'
  },
  {
    path: '/logout',
    component: lazy(() => import('../components/logout/Logout')),
    exact: true,
    title: 'Logout'
  },
  {
    path: '/',
    component: lazy(() => import('../components/overview/Overview')),
    exact: false,
    routes: [
      {
        path: '/account',
        component: lazy(() => import('../components/account/Account')),
        guards: [loggedInGuard],
        title: 'My Account'
      },
      {
        path: '/search',
        component: lazy(() => import('../components/search/Search')),
        title: 'Search'
      },
      {
        path: '/products/:permalink',
        component: lazy(() => import('../components/product/Product'))
      },
      {
        path: '/hangar',
        component: lazy(() => import('../components/hangar/Hangar')),
        guards: [loggedInGuard],
        title: 'My Account',
        exact: false,
        routes: [
          {
            path: '/',
            component: lazy(() => import('../components/hangar/Aircraft')),
            title: 'Aircraft'
          },
          {
            path: '/products',
            component: lazy(() => import('../components/hangar/Products')),
            title: 'Products'
          },
          {
            path: '/alert-history',
            component: lazy(() => import('../components/hangar/AlertHistory')),
            title: 'Alert History'
          }
        ]
      }
    ]
  }
];

/**
 * Apply guards
 */
export function applyGuards(item, index = 0) {
  const guard = (item.guards || [])[index];
  if (isUndefined(guard)) {
    return <item.component {...item.props} routes={item.routes} />
  } else {
    const Guard = guards[guard.name]
    return (
      <Guard {...omit(guard, ['name'])}>
        {applyGuards(item, index + 1)}
      </Guard>
    );
  }
}

/**
 * On route change
 */
export function onRouteChange(callback) {
  const watcher = watch(['@@router/LOCATION_CHANGE'], callback);
  return () => {
    watcher.cancel();
  };
}

/**
 * Redirect
 */
export function redirect(path, replace = false) {
  return history[replace ? 'replace' : 'push'](path);
}

/**
 * Get route
 */
export function route(item) {
  if (!item.component) {
    item = {
      component: item,
    };
  }
  const routes = (item.routes || []).map((subroute) => {
    const subpath = trimStart(subroute.path, '/'),
          path = trimEnd(item.path, '/') + (subpath ? ('/' + subpath) : '');
    return {
      ...subroute,
      path
    };
  });
  return (
    <Route
      key={item.path}
      exact={item.exact !== false}
      path={item.path}
      render={(props) => applyGuards({
        ...item,
        props,
        routes
      })}
    />
  );
}

/**
 * Route query
 */
export function routeQuery({ location: { pathname, search } }) {
  return {
    path: pathname,
    query: fromQuery(search)
  };
}

/**
 * Get routes
 */
export function routes(list) {
  return list.map(route);
}

/**
 * Use router
 */
export function useRouter(Component) {
  return withRouter((props) => {
    return (
      <Component {...props} />
    );
  });
}

export default routeList;
