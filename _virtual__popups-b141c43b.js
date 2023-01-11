const name = "Scratch Messaging";
const description = "Available when clicking the Scratch Addons icon. Provides easy reading and replying to your Scratch messages: groups messages by project, shows full comment text and context, allows direct comment replying.";
const credits = [
	{
		name: "World_Languages"
	},
	{
		name: "griffpatch"
	}
];
const popup = {
	name: "Messaging",
	icon: "envelope",
	component: "component.vue"
};
const versionAdded = "1.0.0";
const tags = [
	"recommended"
];
const enabledByDefault = true;
var addon = {
	name: name,
	description: description,
	credits: credits,
	popup: popup,
	versionAdded: versionAdded,
	tags: tags,
	enabledByDefault: enabledByDefault
};

var popups = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'scratch-messaging': addon
});

export { popups as p };
