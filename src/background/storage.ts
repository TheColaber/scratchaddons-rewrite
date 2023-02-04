import { getBucket } from "@extend-chrome/storage";

export interface Storage {
  addonsEnabled: { [id: string]: boolean };
  darkTheme: boolean;
  installedDetails: chrome.runtime.InstalledDetails | null;
}

export default getBucket<Storage>("storage", "sync");
