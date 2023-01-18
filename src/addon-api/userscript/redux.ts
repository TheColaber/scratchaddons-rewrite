export default class ReduxHandler extends EventTarget {
  initialized: boolean;

  constructor() {
    super();
    this.initialized = false;
    this.initialize();
  }

  /**
   * Initialize the handler. Must be called before adding events.
   */
  initialize() {
    if (!window.scratchAddons.redux.target || this.initialized) return;
    this.initialized = true;
    window.scratchAddons.redux.target.addEventListener("statechanged", (({
      detail,
    }: CustomEvent) => {
      const newEvent = new CustomEvent("statechanged", {
        detail: {
          action: detail.action,
          prev: detail.prev,
          next: detail.next,
        },
      });
      this.dispatchEvent(newEvent);
    }) as EventListener);
  }

  /**
   * Redux state.
   * @type {object}
   */
  get state() {
    return window.scratchAddons.redux.state;
  }

  /**
   * Dispatches redux state change.
   * @param {object} payload - payload to pass to redux.
   * @throws when Redux is unavailable.
   */
  dispatch(payload: any) {
    if (!window.scratchAddons.redux.dispatch)
      throw new Error("Redux is unavailable");
    window.scratchAddons.redux.dispatch(payload);
  }

  /**
   * Waits until a state meets the condition.
   * @param {function} condition - a function that takes redux state and returns whether to keep waiting or not.
   * @param {object=} opts - options.
   * @param {string=|string[]=} actions - the action(s) to check for.
   * @returns {Promise} a Promise resolved when the state meets the condition.
   */
  waitForState(
    condition: (state: any) => boolean,
    { actions }: { actions?: string | string[] } = {}
  ) {
    return new Promise((resolve, reject) => {
      this.initialize();
      if (!window.scratchAddons.redux.target) return reject("Redux not found.");
      if (condition(window.scratchAddons.redux.state)) return resolve(true);
      if (typeof actions === "string") actions = [actions];
      const listener = (({ detail }: CustomEvent) => {
        if (!window.scratchAddons.redux.target)
          return reject("Redux not found.");
        if (actions && !actions.includes(detail.action.type)) return;
        if (!condition(detail.next)) return;
        window.scratchAddons.redux.target.removeEventListener(
          "statechanged",
          listener
        );
        // TODO: WHY DO WE DO THIS????
        setTimeout(resolve, 0);
      }) as EventListener;
      window.scratchAddons.redux.target.addEventListener(
        "statechanged",
        listener
      );
    });
  }
}
