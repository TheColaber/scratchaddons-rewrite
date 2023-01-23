import component from "./component.vue";

export default defineManifest({
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
  versionAdded: "1.0.0",
  tags: ["recommended"],
  enabledByDefault: true,
});
