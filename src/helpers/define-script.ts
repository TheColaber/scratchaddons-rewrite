import UserscriptAddon from "../addon-api/userscript";

export default function defineScript(
  script: (apis: {
    addon: UserscriptAddon;
    console: Console;
    msg: (msg: string) => string;
  }) => Promise<void>
) {
  return script;
}
