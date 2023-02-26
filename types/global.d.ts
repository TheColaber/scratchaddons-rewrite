import { Blockly } from "./apis/Blockly";

declare global {
  // const defineScript: typeof import("./helpers/define-script").default;
  // const defineManifest: typeof import("./helpers/addon-manifest").defineAddonManifest;

  interface Window {
    scratchAddons: {
      loaded: boolean;
      console: Console;
      events: EventTarget;
      redux: { target: EventTarget; state?: any; dispatch?: any };
      sharedObserver: import("../../src/mainworld/classes/shared-observer").default;
      classNames: {
        loaded: boolean;
        promise: Promise<void>;
        arr: string[];
      };
      Blockly: null | Blockly;
      getBlockly(): Promise<Blockly>;
      getInternalKey(elem: Element): keyof Element;
    };
    scratchAddonsReady: Promise<any>;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (...args: any) => void;
  }
}
export {};
