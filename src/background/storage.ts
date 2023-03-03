import { getBucket } from "@extend-chrome/storage";

export interface SyncStorage {
  addonsEnabled: { [id: string]: boolean };
  darkTheme: boolean;
}

export interface LocalStorage {
  installedDetails: chrome.runtime.InstalledDetails | null;
  lastSelectedPopup: string | null;
}

export const syncStorage = getBucket<SyncStorage>("syncstorage", "sync");
export const localStorage = getBucket<LocalStorage>("localstorage", "local");
