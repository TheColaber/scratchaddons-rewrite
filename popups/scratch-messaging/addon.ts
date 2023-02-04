import { definePopupManifest } from "../../types/helpers/addon-manifest";
import component from "./component.vue";
import worker from "./worker";

export default definePopupManifest({
  name: "Scratch Messaging",
  description:
    "Available when clicking the Scratch Addons icon. Provides easy reading and replying to your Scratch messages: groups messages by project, shows full comment text and context, allows direct comment replying.",
  credits: [
    {
      name: "World_Languages",
    },
    {
      name: "griffpatch",
    },
  ],
  popup: {
    component,
    name: "Messaging",
    icon: "envelope",
  },
  worker,
  versionAdded: "1.0.0",
  tags: ["recommended"],
  enabledByDefault: true,
});
