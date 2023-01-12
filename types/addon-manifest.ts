import { ComponentPublicInstance } from "vue";

export interface AddonManifest {
  name: string;
  description: string;
  versionAdded: string;
  credits?: { name: string }[];
  popup?: {
    name: string;
    icon: string;
    component: ComponentPublicInstance;
  };
  userscripts?: {
    func: Function;
    matches: string[];
    runAtComplete: boolean;
  }[];
  tags: string[];
  enabledByDefault?: boolean;
}
