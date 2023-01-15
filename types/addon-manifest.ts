import { Component } from "vue";
import matches from "../src/mainworld/matches";

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
    func: Function;
    matches: (keyof typeof matches)[];
    runAtComplete: boolean;
  }[];
  worker?: Function;
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
