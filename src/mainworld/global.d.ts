interface Window {
  scratchAddons: {
    console: Console;
    events: EventTarget;
    redux: {};
    sharedObserver: import("./shared-observer").default;
  };
}
