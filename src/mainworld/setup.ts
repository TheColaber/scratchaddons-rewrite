import SharedObserver from "./shared-observer";

window.scratchAddons = {
  console: { ...console },
  events: new EventTarget(),
  redux: {},
  sharedObserver: new SharedObserver(),
};
