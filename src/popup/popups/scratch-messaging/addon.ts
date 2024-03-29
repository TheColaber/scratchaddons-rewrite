import { definePopupManifest } from "../../../../types/helpers/addon-manifest";
import component from "./component.vue";
import badge from "./badge.vue";
import { IconMail } from '@tabler/icons-vue';

export default definePopupManifest({
  name: "Scratch Messaging",
  description:
    "Easy reading and replying to your Scratch messages: groups messages, shows full comment text and context, allows direct comment replying.",
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
    name: "Messages",
    icon: IconMail,
    badge,
  },
  versionAdded: "1.0.0",
  tags: ["recommended"],
  enabledByDefault: true,
});
