interface Window {
  scratchAddons: {
    console: Console;
    events: EventTarget;
    redux: { target: EventTarget; state?: any; dispatch?: any };
    sharedObserver: import("../src/mainworld/classes/shared-observer").default;
    classNames: {
      loaded: boolean;
      arr: string[];
    };
  };

  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (...args: any) => void;
}
