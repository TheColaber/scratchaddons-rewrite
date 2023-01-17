// ReDucks: Redux ducktyped
// Not actual Redux, but should be compatible
class ReDucks {
  static compose(...composeArgs) {
    if (composeArgs.length === 0) return (...args) => args;
    return (...args) => {
      const composeArgsReverse = composeArgs.slice(0).reverse();
      let result = composeArgsReverse.shift()(...args);
      for (const fn of composeArgsReverse) {
        result = fn(result);
      }
      return result;
    };
  }

  static applyMiddleware(...middlewares) {
    return (createStore) =>
      (...createStoreArgs) => {
        const store = createStore(...createStoreArgs);
        let { dispatch } = store;
        const api = {
          getState: store.getState,
          dispatch: (action) => dispatch(action),
        };
        const initialized = middlewares.map((middleware) => middleware(api));
        dispatch = ReDucks.compose(...initialized)(store.dispatch);
        return Object.assign({}, store, { dispatch });
      };
  }
}

let newerCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
function compose(...args) {
  window.scratchAddons.redux.target = new EventTarget();
  window.scratchAddons.redux.state = {};
  window.scratchAddons.redux.dispatch = () => {};

  function middleware({ getState, dispatch }) {
    window.scratchAddons.redux.dispatch = dispatch;
    window.scratchAddons.redux.state = getState();
    return (next) => (action) => {
      const nextReturn = next(action);
      const ev = new CustomEvent("statechanged", {
        detail: {
          prev: window.scratchAddons.redux.state,
          next: (window.scratchAddons.redux.state = getState()),
          action,
        },
      });
      window.scratchAddons.redux.target.dispatchEvent(ev);
      return nextReturn;
    };
  }
  args.splice(1, 0, ReDucks.applyMiddleware(middleware));
  return newerCompose
    ? newerCompose.apply(this, args)
    : ReDucks.compose.apply(this, args);
}

Object.defineProperty(window, "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", {
  get: () => compose,
  set: (v) => {
    newerCompose = v;
  },
});
