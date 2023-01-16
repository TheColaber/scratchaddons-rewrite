import UserscriptAddon from "../addon-api/userscript";

export default function defineScript(script: (apis: { addon: UserscriptAddon}) => Promise<void>) {
  return script;
}
