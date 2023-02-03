import { getBucket } from "@extend-chrome/storage";

export interface Storage {
  addonsEnabled: { [id: string]: boolean };
  darkTheme: boolean;
  openedSettingsReason: "update" | "install" | null;
}

export default getBucket<Storage>("addonsEnabled");
