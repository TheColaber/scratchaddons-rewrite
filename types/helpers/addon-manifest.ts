import { Component } from "vue";
// import matches from "../src/mainworld/matches";
// import defineScript from "../src/helpers/define-script";

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
    // script: ReturnType<typeof defineScript>;
    // matches: (keyof typeof matches)[];
    runAtComplete: boolean;
  }[];
  userstyles?: {
    style: string;
    // matches: (keyof typeof matches)[];
  }[];
  worker?: Function;
  hotkeys?: {
    id: string;
    description: string;
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

export function defineAddonManifest(manifest: AddonManifest) {
  return manifest;
}
export function definePopupManifest(manifest: PopupManifest) {
  return manifest;
}
