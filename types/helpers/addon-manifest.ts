import { Component } from "vue";
import matches from "../../src/mainworld/matches";
import defineScript from "./define-script";

export interface AddonManifest {
  name: string;
  description: string;
  versionAdded: string;
  credits?: { name: string }[];
  scripts?: {
    scripts?: ReturnType<typeof defineScript>[];
    styles?: string[];
    matches: (keyof typeof matches)[];
    runAtComplete?: boolean;
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
    icon: Component;
    component: Component;
    badge?: Component
  };
}

export function defineAddonManifest(manifest: AddonManifest) {
  return manifest;
}
export function definePopupManifest(manifest: PopupManifest) {
  return manifest;
}
