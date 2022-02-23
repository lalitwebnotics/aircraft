import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';
import omit from 'lodash/omit';
import range from 'lodash/range';

/**
 * Orders
 */
export const orders = [
  'asc',
  'desc'
];

/**
 * Bind methods
 */
export function bind(object, methods = []) {
  (methods || Object.getOwnPropertyNames(object.constructor.prototype)).forEach((key) => {
    if (key !== 'constructor' && isFunction(object[key])) {
      object[key] = object[key].bind(object);
    }
  });
  return object;
}

/**
 * Call
 */
export function call(callback, ...args) {
  return (e) => {
    if (isFunction(callback)) {
      return callback(...args, e);
    }
  };
}

/**
 * Replace deep
 */
export function deep(object, names, value) {
  if (isString(names)) {
    names = names.split('.');
  }
  if (names.length === 1) {
    return {
      ...object,
      [names[0]]: value
    };
  } else {
    const name = names.shift();
    return {
      ...object,
      [name]: deep(object[name], names, value)
    };
  }
}


/**
 * Delay
 */
export function delay(data, timeout = 200) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

/**
 * First string
 */
export function firstString(data = {}) {
  const array = isArray(data),
        names = array ? range(data.length) : keys(data);
  for (let i = 0; i < names.length; i++) {
    const value = data[names[i]];
    if (isString(value)) {
      return value;
    }
    const found = firstString(value);
    if (found !== false) {
      return found;
    }
  }
  return false;
}

/**
 * Stop propagation on event
 */
export function freeze(callback, ...args) {
  return (e) => {
    e.stopPropagation();
    if (isFunction(callback)) {
      return callback(...args, e);
    }
  };
}

/**
 * Query string to object
 */
export function fromQuery(url) {
  const question = url.indexOf('?');
  if (question < 0) {
    return {};
  }
  const object = {},
        hash = url.indexOf('#', question),
        query = url.substring(question + 1, (hash < 0) ? undefined : hash);
  query.split('&').forEach((pair) => {
    const [name, value] = pair.split('=');
    object[name] = isUndefined(value) ? true : decodeURIComponent(value);
  });
  return object;
}

/**
 * Get screen
 */
export function getScreen() {
  return {
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  };
}

/**
 * Get scroll value
 */
export function getScroll() {
  return {
    position: window.scrollY,
    height: document.body.clientHeight - window.innerHeight
  };
}

/**
 * Element
 */
export function isWithinElement(parent, element) {
  while (element) {
    if (element === parent) {
      return true;
    }
    element = element.parentNode;
  }
  return false;
}

/**
 * Listen for an event
 */
export function listen(element, name, callback, capture = false) {
  element.addEventListener(name, callback, capture);
  return () => {
    element.removeEventListener(name, callback, capture);
  };
}

/**
 * Wait for an event once
 */
export function once(element, name) {
  return new Promise((resolve) => {
    const unlisten = listen(element, name, (e) => {
      if (e.target === element) {
        unlisten();
        resolve(e);
      }
    });
  });
}

/**
 * On scroll
 */
export function onScroll(callback) {
  const stats = {
    down: false,
    last: 0
  };
  const listener = (e) => {
    const { position, height } = getScroll(),
          down = position > stats.last;
    callback({
      down,
      height,
      last: stats.last,
      position,
      reversed: (down !== stats.down)
    }, e);
    stats.down = down;
    stats.last = position;
  };
  return listen(window, 'scroll', listener, true);
}

/**
 * Set state
 */
export function setState(component, state) {
  return new Promise((resolve) => {
    component.setState(state, resolve);
  });
}

/**
 * Sort
 */
export function sort(route, field) {
  const { query } = route,
        options = {},
        lcase = String(query.order).toLowerCase();
  let icon = 'sort';
  if ((query.sort !== field) || (orders.indexOf(lcase) < 0)) {
    options.sort = field;
    options.order = 'asc';
  } else {
    if (lcase === 'asc') {
      options.sort = field;
      options.order = 'desc';
      icon += '-down';
    } else if (lcase === 'desc') {
      icon += '-up';
    }
  }
  return {
    active: (icon !== 'sort'),
    icon,
    url: route.path + toQuery({
      ...omit(query, [
        'order',
        'sort',
        'start'
      ]),
      ...options
    })
  }
}

/**
 * Object to query string
 */
export function toQuery(object) {
  const pairs = [];
  keys(object).forEach((name) => {
    const value = object[name];
    if (value === false) {
      return;
    } else if (isUndefined(value) || (value === true)) {
      pairs.push(name);
    } else {
      pairs.push(name + '=' + encodeURIComponent(value));
    }
  });
  return pairs.length ? ('?' + pairs.join('&')) : '';
}
