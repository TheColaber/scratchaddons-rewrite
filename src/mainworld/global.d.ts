interface Window {
  scratchAddons: {
    console: Console;
    events: EventTarget;
    redux: { target?: EventTarget, state?: any, dispatch?: any };
    sharedObserver: import("./shared-observer").default;
  };
}
