import { Component } from "vue";
import matches from "../src/mainworld/matches";
import defineScript from "../src/helpers/define-script";

export interface AddonManifest {
  name: string;
  description: string;
  versionAdded: string;
  credits?: { name: string }[];
  popup?: {
    name: string;
    icon: string;
    component: Component;
  };
  userscripts?: {
    func: ReturnType<typeof defineScript>;
    matches: (keyof typeof matches)[];
    runAtComplete: boolean;
  }[];
  worker?: Function;
  hotkeys?: {
    id: string;
    default: string[];
  }[];
  tags: string[];
  enabledByDefault?: boolean;
}

export interface PopupManifest extends AddonManifest {
  popup: {
    name: string;
    icon: string;
    component: Component;
  };
}
